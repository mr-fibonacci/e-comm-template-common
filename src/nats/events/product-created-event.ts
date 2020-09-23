import { Event } from '../base-classes/base-event';

export interface ProductCreatedEventData {
  id: string;
  name: string;
  category: string;
  inStock: number;
  price: number;
  userId: string;
  activeOrders: Record<string, string>;
}

export interface ProductCreatedEvent extends Event {
  subject: 'product:created';
  data: ProductCreatedEventData;
}
