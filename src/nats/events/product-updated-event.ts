import { Event } from '../base-classes/base-event';

export interface ProductUpdatedEventData {
  id: string;
  name: string;
  category: string;
  inStock: number;
  price: number;
  version: number;
}

export interface ProductUpdatedEvent extends Event {
  subject: 'product:updated';
  data: ProductUpdatedEventData;
}
