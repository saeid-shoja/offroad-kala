export type ProductSituation = 'NEW' | 'USED' | 'IN_STOCK' | null;

export function getSituationLabel(situation: ProductSituation): string | null {
  if (situation === 'IN_STOCK') return 'موجود در انبار';
  if (situation === 'USED') return 'کارکرده';
  if (situation === 'NEW') return 'نو';
  return null;
}

export const PRICE_FILTER_MAX = 500_000_000;
export const PRICE_FILTER_STEP = 1_000_000;

export const POSTED_WITHIN_OPTIONS = [
  { value: '', label: 'همه زمان‌ها' },
  { value: '24h', label: '۲۴ ساعت اخیر' },
  { value: '7d', label: '۷ روز اخیر' },
  { value: '30d', label: '۳۰ روز اخیر' },
] as const;

export const SITUATION_FILTER_OPTIONS = [
  { value: '', label: 'همه' },
  { value: 'NEW', label: 'نو' },
  { value: 'USED', label: 'کارکرده' },
] as const;

export const GUARANTEE_FILTER_OPTIONS = [
  { value: '', label: 'همه' },
  { value: 'true', label: 'دارای ضمانت' },
  { value: 'false', label: 'بدون ضمانت' },
] as const;
