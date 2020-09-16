export interface CurrentUser {
  email: string;
  id: string;
}

const ReadOnlyCategories = [
  'laptops',
  'electronics',
  'home & garden',
  'beauty',
  'cloathing',
  'grocery',
] as const;

// a hack so that I don't have to rewrite the ReadOnlyCategories as a non-read-only array
export const productCategories = ReadOnlyCategories.map((item) => item);

export type ProductCategory = typeof ReadOnlyCategories[number];

export interface ActiveOrder {
  isReturned: boolean;
  orderVersion: number;
}

export interface OrderProductItem {
  quantity: number;
  id: string;
  // version: number;
  error?: string;
  isReturned?: boolean;
}

export type OrderItems = OrderProductItem[];
