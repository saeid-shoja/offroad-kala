import { randomBytes } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import type { ForgotPasswordDto, LoginDto, RegisterDto } from './dto';

const FORGOT_PASSWORD_MESSAGE =
  'اگر ایمیل شما در سیستم ثبت شده باشد، رمز عبور جدید به آن ارسال می‌شود';

function generateRandomPassword(length = 10): string {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(length);
  return Array.from(bytes, (byte) => chars[byte % chars.length]).join('');
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    @Inject('JWT_SECRET') _jwtSecret: string,
  ) {}

  async register(data: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { phone: data.phone } });
    if (existing) {
      throw new ConflictException('این شماره موبایل قبلاً ثبت نام کرده است');
    }

    const existingEmail = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existingEmail) {
      throw new ConflictException('این ایمیل قبلاً ثبت شده است');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        phone: data.phone,
        email: data.email.toLowerCase(),
        name: data.name,
        password: hashedPassword,
        city: data.city,
      },
    });

    await this.mailService.sendWelcome(user.email!, user.name).catch(() => {
      // Registration succeeds even if welcome email fails
    });

    const token = this.jwtService.sign({ sub: user.id, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role,
        city: user.city,
      },
    };
  }

  async login(data: LoginDto) {
    const phone = data.phone?.trim();
    const password = data.password;

    if (!phone) {
      throw new BadRequestException('شماره موبایل را وارد کنید');
    }
    if (!/^09\d{9}$/.test(phone)) {
      throw new BadRequestException('شماره موبایل معتبر نیست (مثال: 09123456789)');
    }
    if (!password) {
      throw new BadRequestException('رمز عبور را وارد کنید');
    }
    if (password.length < 6) {
      throw new BadRequestException('رمز عبور باید حداقل ۶ کاراکتر باشد');
    }

    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new UnauthorizedException('شماره موبایل یا رمز عبور اشتباه است');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('شماره موبایل یا رمز عبور اشتباه است');
    }

    const token = this.jwtService.sign({ sub: user.id, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role,
        city: user.city,
      },
    };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const email = data.email.toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user?.email) {
      const newPassword = generateRandomPassword();

      try {
        await this.mailService.sendNewPassword(user.email, user.name, newPassword);
      } catch {
        return { message: FORGOT_PASSWORD_MESSAGE };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
    }

    return { message: FORGOT_PASSWORD_MESSAGE };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        email: true,
        name: true,
        role: true,
        city: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('کاربر یافت نشد');
    return user;
  }
}
