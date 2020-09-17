import { Event } from './base-event';
import { OrderItems } from '../types/custom-types';

interface OrderDeletedEventData {
  id: string;
  version: number;
  items: OrderItems;
}

export interface OrderDeletedEvent extends Event {
  subject: 'order:deleted';
  data: OrderDeletedEventData;
}
