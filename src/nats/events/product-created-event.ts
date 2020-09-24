import { Event } from '../base-classes/base-event';

interface ProductCreatedEventData {
  id: string;
  name: string;
  category: string;
  inStock: number;
  price: number;
  userId: string;
}

export interface ProductCreatedEvent extends Event {
  subject: 'product:created';
  data: ProductCreatedEventData;
}
