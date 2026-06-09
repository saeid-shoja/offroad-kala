import { z } from 'zod';

const phoneSchema = z
  .string()
  .min(1, 'شماره موبایل را وارد کنید')
  .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست. از اعداد انگلیسی استفاده کنید (مثال: 09123456789)');

const passwordSchema = z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد');

const emailSchema = z.string().min(1, 'ایمیل را وارد کنید').email('ایمیل معتبر نیست');

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, 'رمز عبور را وارد کنید'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  city: z.string().min(1, 'شهر را انتخاب کنید'),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
