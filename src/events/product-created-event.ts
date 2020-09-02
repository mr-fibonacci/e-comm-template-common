import { Event } from './base-event';

export interface ProductCreatedEventData {
  id: string;
  name: string;
  category: string;
  inStock: number;
  price: number;
  userId: string;
  activeOrders: string[];
}

export interface ProductCreatedEvent extends Event {
  subject: 'product:created';
  data: ProductCreatedEventData;
}
