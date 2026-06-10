import { SITE_NAME_FA } from '@offroad/shared';
import Image from 'next/image';
import Link from 'next/link';

export const SITE_LOGO_SRC = '/logo.png';

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-10 w-auto',
  lg: 'h-12 w-auto',
} as const;

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
  showName?: boolean;
  nameClassName?: string;
  href?: string | null;
  priority?: boolean;
  size?: keyof typeof sizeClasses;
};

export function SiteLogo({
  className = '',
  imageClassName = '',
  showName = false,
  nameClassName = '',
  href = '/dashboard',
  priority = false,
  size = 'sm',
}: SiteLogoProps) {
  const content = (
    <>
      <Image
        src={SITE_LOGO_SRC}
        alt={`${SITE_NAME_FA} — لوگو`}
        width={1260}
        height={948}
        priority={priority}
        className={`object-contain ${sizeClasses[size]} ${imageClassName}`.trim()}
      />
      {showName && (
        <span className={`text-primary font-bold ${nameClassName}`.trim()}>{SITE_NAME_FA}</span>
      )}
    </>
  );

  const rootClassName = `inline-flex shrink-0 items-center gap-2 ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={rootClassName} aria-label={`${SITE_NAME_FA} — پنل مدیریت`}>
        {content}
      </Link>
    );
  }

  return <div className={rootClassName}>{content}</div>;
}
