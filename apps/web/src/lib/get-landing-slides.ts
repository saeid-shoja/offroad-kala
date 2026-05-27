import { api } from '@/lib/api';

export type Slide = {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  link?: string;
  linkLabel?: string;
};

// Mock data until backend /slides endpoint is ready
export const MOCK_SLIDES: Slide[] = [
  {
    id: '1',
    imageUrl: '/images/hero/s1.webp',
    title: 'آفرود شاپ | فروشگاه تخصصی لوازم آفرود',
    description: 'خرید و فروش لوازم و تجهیزات آفرود با ضمانت اصالت کالا',
    link: '/products',
    linkLabel: 'بازارچه آفرود',
  },
  {
    id: '2',
    imageUrl: '/images/hero/s2.jpg',
    title: 'تجهیزات حرفه‌ای برای مسیرهای سخت',
    description: 'لاستیک، لیفت کیت، بردگارد و قطعات اورجینال',
    link: '/categories',
    linkLabel: 'دسته‌بندی‌ها',
  },
  {
    id: '3',
    imageUrl: '/images/hero/s3.jpg',
    title: 'آگهی خود را ثبت کنید',
    description: 'مانند بازارچه، محصول دست‌دوم خود را بفروشید',
    link: '/products/new',
    linkLabel: 'ثبت آگهی',
  },
  {
    id: '4',
    imageUrl: '/images/hero/s4.jpeg',
    title: 'آگهی خود را ثبت کنید',
    description: 'مانند بازارچه، محصول دست‌دوم خود را بفروشید',
    link: '/products/new',
    linkLabel: 'ثبت آگهی',
  },
];

export async function fetchSlides(): Promise<Slide[]> {
  try {
    return await api.slides.list();
  } catch {
    // Fallback to mock until API is available
    return MOCK_SLIDES;
  }
}
