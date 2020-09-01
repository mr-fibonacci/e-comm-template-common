const Subjects = [
  'user:created',
  'user:updated',
  'user:deleted',

  'product:created',
  'product:updated',
  'product:deleted',

  'order:created',
  'order:updated',
  'order:deleted',

  'payment:created',
  'payment:updated',
  'payment:deleted',

  'expiry:order',
] as const;

export type Subject = typeof Subjects[number];
