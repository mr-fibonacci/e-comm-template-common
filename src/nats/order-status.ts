const OrderStatuses = [
  'pending',
  'awaiting-action',
  'cancelled',
  'finalized',
] as const;

export type OrderStatus = typeof OrderStatuses[number];
