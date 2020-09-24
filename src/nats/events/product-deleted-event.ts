import { Event } from '../base-classes/base-event';

interface ProductDeletedEventData {
  id: string;
  version: number;
}

export interface ProductDeletedEvent extends Event {
  subject: 'product:deleted';
  data: ProductDeletedEventData;
}
