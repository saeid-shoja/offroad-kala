/** Product listing source: shop inventory vs user ad */
export type Advertiser = 'SHOP' | 'CLIENT';

export function getProductAdvertiser(product: {
  advertiser?: string | null;
  type?: string | null;
}): Advertiser {
  const value = product.advertiser ?? product.type;
  return value === 'SHOP' ? 'SHOP' : 'CLIENT';
}

export function isShopProduct(product: {
  advertiser?: string | null;
  type?: string | null;
}): boolean {
  return getProductAdvertiser(product) === 'SHOP';
}

export function isClientProduct(product: {
  advertiser?: string | null;
  type?: string | null;
}): boolean {
  return getProductAdvertiser(product) === 'CLIENT';
}
