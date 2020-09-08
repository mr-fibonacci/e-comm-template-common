import { Event } from './base-event';

export interface ProductReservedEventData {
  id: string;
  quantity: number;
}

export interface ProductReservedEvent extends Event {
  subject: 'product:reserved';
  data: ProductReservedEventData;
}
