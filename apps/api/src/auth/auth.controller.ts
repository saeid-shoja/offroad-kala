import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SWAGGER_BEARER_KEY } from '../swagger';
import { AuthService } from './auth.service';
import { Public } from './custom.decorator';
import { ForgotPasswordDto, LoginDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @ApiBearerAuth(SWAGGER_BEARER_KEY)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.authService.getProfile(req.user.userId);
  }
}
