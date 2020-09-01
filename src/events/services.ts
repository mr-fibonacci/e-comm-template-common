const Services = [
  'auth',
  'expiry',
  'orders',
  'payments',
  'products',
  // comments, reviews, etc
] as const;

export type Service = typeof Services[number];
