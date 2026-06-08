import type { Metadata } from 'next';
import { SiteLogo } from '@/components/layout/site-logo';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'ورود',
  description: 'ورود به حساب کاربری جیپو',
  path: '/login',
  noIndex: true,
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 flex justify-center">
        <SiteLogo href="/" size="lg" />
      </div>
      {children}
    </>
  );
}
