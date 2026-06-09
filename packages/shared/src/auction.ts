/** Minimum raise rate by current bid tier (Toman) */
export function getMinimumBidIncrementRate(currentPrice: number): number {
  if (currentPrice < 50_000_000) return 0.05;
  if (currentPrice < 100_000_000) return 0.035;
  if (currentPrice < 200_000_000) return 0.02;
  return 0.01;
}

export function getMinimumBidIncrement(currentPrice: number): number {
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) return 0;
  return Math.ceil(currentPrice * getMinimumBidIncrementRate(currentPrice));
}

export function getMinimumNextBid(currentPrice: number): number {
  return currentPrice + getMinimumBidIncrement(currentPrice);
}

export function formatBidIncrementRate(currentPrice: number): string {
  const rate = getMinimumBidIncrementRate(currentPrice);
  return `${(rate * 100).toLocaleString('fa-IR', { maximumFractionDigits: 1 })}٪`;
}

export interface AuctionTiming {
  endsAt: string | Date;
  now?: Date;
}

export function isAuctionActive(timing: AuctionTiming): boolean {
  const end = new Date(timing.endsAt).getTime();
  const now = (timing.now ?? new Date()).getTime();
  return end > now;
}

export function getAuctionTimeRemaining(
  endsAt: string | Date,
  now: Date = new Date(),
): {
  expired: boolean;
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const end = new Date(endsAt).getTime();
  const totalMs = Math.max(0, end - now.getTime());
  const expired = totalMs <= 0;
  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  return { expired, totalMs, days, hours, minutes, seconds };
}

export function formatAuctionCountdown(endsAt: string | Date, now?: Date): string {
  const t = getAuctionTimeRemaining(endsAt, now);
  if (t.expired) return 'پایان یافته';
  if (t.days > 0) return `${t.days} روز و ${t.hours} ساعت`;
  if (t.hours > 0) return `${t.hours} ساعت و ${t.minutes} دقیقه`;
  if (t.minutes > 0) return `${t.minutes} دقیقه و ${t.seconds} ثانیه`;
  return `${t.seconds} ثانیه`;
}

export function getAuctionCurrentPrice(startPrice: number, storedCurrent?: number | null): number {
  if (storedCurrent != null && storedCurrent > 0) return storedCurrent;
  return startPrice;
}
