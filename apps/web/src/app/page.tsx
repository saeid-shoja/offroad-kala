import { SITE_DESCRIPTION } from '@offroad/shared';
import type { Metadata } from 'next';
import { HeroSlider } from '@/components/home/hero';
import MainSection from '@/components/home/main-section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `خرید و فروش تجهیزات استوک آفرودی`,
  description: SITE_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <div className="relative -mx-4 -mt-12 mb-4">
        <HeroSlider />
      </div>
      <MainSection />
    </>
  );
}
