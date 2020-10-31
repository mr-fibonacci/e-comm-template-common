const ProductStatuses = ['active', 'pending', 'suspended', 'deleted'] as const;

export type ProductStatus = typeof ProductStatuses[number];
