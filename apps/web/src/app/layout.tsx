import './globals.css';
import { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { StoreInitializer } from '@/providers/store-initializer';
import { Navbar } from '@/components/layout/navbar';
import { SiteFooter } from '@/components/layout/footer';
import localFont from 'next/font/local'
import { cn } from '@/lib/utils';

const yekanFont = localFont({
  src: '../../public/fonts/yekan/yekan.ttf',
})

const nazaninFont = localFont({
  src: '../../public/fonts/nazanin/nazanin.ttf',
})

export const metadata: Metadata = {
  title: 'آفرود شاپ | خرید و فروش تجهیزات استوک آفرودی',
  description: 'فروشگاه آنلاین لوازم آفرود و مزایده آگهی های خرید و فروش محصولات استوک آفرودی',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn("flex min-h-screen flex-col", yekanFont.className)}>
        <ThemeProvider>
          <StoreInitializer />
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-5rem)] w-full flex-1 py-6">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
