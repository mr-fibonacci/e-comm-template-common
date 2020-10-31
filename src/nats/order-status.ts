const OrderStatuses = [
  'pending',
  'active',
  'cancelled',
  'expired',
  'finalized',
] as const;

export type OrderStatus = typeof OrderStatuses[number];
