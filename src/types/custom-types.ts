export interface CurrentUser {
  email: string;
  id: string;
}

const ReadOnlyCategories = [
  'laptops',
  'electronics',
  'home & garden',
  'beauty',
  'clothing',
  'grocery',
] as const;

// a hack so that I don't have to rewrite the ReadOnlyCategories as a non-read-only array
export const productCategories = ReadOnlyCategories.map((item) => item);

export type ProductCategory = typeof ReadOnlyCategories[number];

export interface ProductReqAttrs {
  name: string;
  category: ProductCategory;
  inStock: number;
  price: number;
}

export interface OrderProductItem {
  quantity: number;
  id: string;
  version: number;
  error?: string;
  current?: ProductReqAttrs;
  isReturned?: boolean;
}

export type OrderItems = OrderProductItem[];
