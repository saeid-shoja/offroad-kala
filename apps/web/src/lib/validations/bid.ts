import { formatPrice } from '@offroad/shared';
import { z } from 'zod';

const bidBaseSchema = z.object({
  bidAmount: z.number().positive('مبلغ پیشنهاد باید بیشتر از صفر باشد'),
  bidderName: z.string().min(2, 'نام را وارد کنید'),
  bidderPhone: z
    .string()
    .min(1, 'شماره تماس را وارد کنید')
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  bidderAddress: z.string().min(10, 'آدرس کامل را وارد کنید'),
  bidderCity: z.string().optional(),
});

export const bidSchema = bidBaseSchema;

export function createBidSchema(minNextBid: number) {
  return bidBaseSchema.superRefine((data, ctx) => {
    if (data.bidAmount < minNextBid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `حداقل مبلغ پیشنهاد ${formatPrice(minNextBid)} تومان است`,
        path: ['bidAmount'],
      });
    }
  });
}

export type BidFormValues = z.infer<typeof bidBaseSchema>;
