import { Event } from './base-event';

export interface ProductUpdatedEventData {
  id: string;
  name: string;
  category: string;
  inStock: number;
  price: number;
  userId: string;
  version: number;
  // activeOrders: string[];
}

export interface ProductUpdatedEvent extends Event {
  subject: 'product:updated';
  data: ProductUpdatedEventData;
}
