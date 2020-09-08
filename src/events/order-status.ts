const OrderStatuses = ['pending', 'cancelled', 'finalized'] as const;

export type OrderStatus = typeof OrderStatuses[number];
