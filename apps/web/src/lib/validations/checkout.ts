import { z } from 'zod';

export const checkoutSchema = z.object({
  address: z.string().min(10, 'آدرس تحویل را کامل وارد کنید'),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^09\d{9}$/.test(v), 'شماره موبایل معتبر نیست'),
  note: z.string().optional(),
  paymentMethod: z.enum(['ONLINE', 'COD']),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
