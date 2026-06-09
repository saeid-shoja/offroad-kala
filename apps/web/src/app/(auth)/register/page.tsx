'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CitySelect } from '@/components/form/city-select';
import { FieldError } from '@/components/form/field-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { type RegisterFormValues, registerSchema } from '@/lib/validations/auth';
import { useAuth } from '@/stores/auth-store';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      city: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.phone, data.name, data.password, data.email, data.city);
      toast.success('ثبت‌نام با موفقیت انجام شد');
      router.push('/');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'خطا در ثبت نام');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 sm:py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">ثبت نام</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input id="name" type="text" {...register('name')} />
              <FieldError message={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                dir="ltr"
                className="text-end"
                {...register('email')}
              />
              <FieldError message={errors.email?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0912xxxxxxx"
                dir="ltr"
                className="text-end"
                {...register('phone')}
              />
              <FieldError message={errors.phone?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <PasswordInput id="password" {...register('password')} />
              <FieldError message={errors.password?.message} />
            </div>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CitySelect
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={errors.city?.message}
                />
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'در حال ثبت نام...' : 'ثبت نام'}
            </Button>
          </form>
          <p className="text-muted-foreground mt-4 text-center text-sm">
            قبلاً ثبت نام کرده‌اید؟{' '}
            <Link href="/login" className="text-primary hover:underline">
              ورود
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
