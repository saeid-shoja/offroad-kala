'use client';

import {
  BOOST_LISTING_FEE,
  isStrengthenedActive,
  STRENGTHENED_DURATION_DAYS,
  STRENGTHENED_LISTING_FEE,
} from '@offroad/shared';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ListingPremiumPaymentDialog } from '@/components/form/premium-listing-payment-dialog';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

type ProductListingPremiumActionsProps = {
  product: {
    id: string;
    status: string;
    isAuction?: boolean;
    isBoosted?: boolean;
    strengthenedUntil?: string | null;
  };
  onUpdated: () => void | Promise<void>;
};

export function ProductListingPremiumActions({
  product,
  onUpdated,
}: ProductListingPremiumActionsProps) {
  const [paymentKind, setPaymentKind] = useState<'strengthened' | 'boost' | null>(null);
  const [loading, setLoading] = useState(false);

  const strengthenedActive = isStrengthenedActive(product.strengthenedUntil);
  const canUsePremium = product.status === 'ACTIVE' && !product.isAuction;

  if (!canUsePremium) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (paymentKind === 'strengthened') {
        await api.products.applyStrengthened(product.id);
        toast.success(`آگهی برای ${STRENGTHENED_DURATION_DAYS} روز تقویت شد`);
      } else if (paymentKind === 'boost') {
        await api.products.applyBoost(product.id);
        toast.success('آگهی پله شد و به بالای لیست منتقل شد');
      }
      setPaymentKind(null);
      await onUpdated();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'عملیات ناموفق بود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 px-1 sm:grid-cols-2">
        <Button
          type="button"
          size="sm"
          variant={strengthenedActive ? 'secondary' : 'outline'}
          className="w-full gap-1 text-xs"
          disabled={loading}
          onClick={() => setPaymentKind('strengthened')}
        >
          <Sparkles className="size-3.5" />
          {strengthenedActive ? 'تمدید تقویت' : 'تقویت شده'}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full gap-1 text-xs"
          disabled={loading}
          onClick={() => setPaymentKind('boost')}
        >
          <TrendingUp className="size-3.5" />
          پله شده
        </Button>
      </div>

      <ListingPremiumPaymentDialog
        open={paymentKind === 'strengthened'}
        onOpenChange={(open) => !open && setPaymentKind(null)}
        loading={loading}
        title="پرداخت هزینه تقویت آگهی"
        description={`آگهی شما به مدت ${STRENGTHENED_DURATION_DAYS} روز در بالای لیست‌ها می‌ماند (بدون توجه به زمان ثبت).`}
        fee={STRENGTHENED_LISTING_FEE}
        onConfirm={handleConfirm}
      />

      <ListingPremiumPaymentDialog
        open={paymentKind === 'boost'}
        onOpenChange={(open) => !open && setPaymentKind(null)}
        loading={loading}
        title="پرداخت هزینه پله‌شدن"
        description="آگهی یک‌بار به بالای لیست منتقل می‌شود و زمان انتشار (listedAt) به‌روز می‌شود."
        fee={BOOST_LISTING_FEE}
        onConfirm={handleConfirm}
      />
    </>
  );
}
