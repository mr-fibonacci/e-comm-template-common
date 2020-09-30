const OrderStatuses = [
  'pending',
  'awaiting-action',
  'cancelled',
  'expired',
  'finalized',
] as const;

export type OrderStatus = typeof OrderStatuses[number];
