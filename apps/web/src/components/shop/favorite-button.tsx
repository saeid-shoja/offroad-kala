'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/stores/auth-store';
import { useFavoritesStore } from '@/stores/favorites-store';

type FavoriteButtonProps = {
  productId: string;
  className?: string;
};

export function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isFavorite = useFavoritesStore((s) => Boolean(s.ids[productId]));
  const toggle = useFavoritesStore((s) => s.toggle);
  const [pending, setPending] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    if (pending) return;

    setPending(true);
    try {
      await toggle(productId);
    } catch {
      // optimistic rollback handled in store
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
      aria-pressed={isFavorite}
      disabled={pending}
      onClick={handleClick}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition-colors hover:bg-background',
        pending && 'opacity-70',
        className,
      )}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-colors',
          isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500',
        )}
      />
    </button>
  );
}
