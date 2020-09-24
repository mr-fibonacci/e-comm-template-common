import { Event } from '../base-classes/base-event';

interface ProductReservedEventData {
  id: string;
  quantity: number;
  isReturned?: boolean;
}

export interface ProductReservedEvent extends Event {
  subject: 'product:reserved';
  data: ProductReservedEventData;
}
