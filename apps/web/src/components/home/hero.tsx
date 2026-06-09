'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { fetchSlides, type Slide } from '@/lib/get-landing-slides';
import { cn } from '@/lib/utils';

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchSlides()
      .then(setSlides)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || slides.length <= 1) return;

    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [api, slides.length]);

  if (loading) {
    return (
      <section
        className="bg-muted flex h-[min(55svh,calc(100svh-8rem))] lg:h-[min(75svh,calc(100svh-8rem))] w-full items-center justify-center"
        aria-label="در حال بارگذاری ..."
      >
        <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
      </section>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden" aria-label="main slider">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="h-[min(55svh,calc(100svh-8rem))] lg:h-[min(75svh,calc(100svh-8rem))] w-full"
      >
        <CarouselContent className="ms-0 h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="ps-0">
              <div className="relative h-[min(55svh,calc(100svh-8rem))] lg:h-[min(75svh,calc(100svh-8rem))] w-full overflow-hidden">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  priority={slide.id === slides[0]?.id}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="from-black/65 via-black/10 absolute inset-0 bg-linear-to-t to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 pb-14 sm:p-6 sm:pb-16 md:p-8 md:pb-10">
                  <div className="mx-auto w-full max-w-7xl">
                    <h1 className="max-w-2xl text-xl font-bold text-white sm:text-2xl md:text-4xl">
                      {slide.title}
                    </h1>
                    {slide.description && (
                      <p className="text-card dark:text-accent-foreground mt-3 max-w-xl text-sm sm:mt-4 sm:text-base md:text-lg">
                        {slide.description}
                      </p>
                    )}
                    {slide.link && (
                      <div className="mt-4 sm:mt-6">
                        <Button asChild size="lg" className="w-full max-w-xs rounded-md sm:w-auto">
                          <Link href={slide.link}>{slide.linkLabel ?? 'مشاهده بیشتر'}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {slides.length > 1 && (
          <>
            <CarouselPrevious className="border-background/80 bg-background/80 text-foreground hover:bg-background hidden sm:inline-flex" />
            <CarouselNext className="border-background/80 bg-background/80 text-foreground hover:bg-background hidden sm:inline-flex" />
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`رفتن به اسلاید ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'size-2.5 rounded-full transition-all',
                    current === index
                      ? 'bg-primary w-8'
                      : 'bg-foreground/40 hover:bg-foreground/70',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </Carousel>
    </section>
  );
}
