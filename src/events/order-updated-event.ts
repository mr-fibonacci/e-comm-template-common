import { Event } from './base-event';
import { OrderItems } from '../types/custom-types';

interface OrderUpdatedEventData {
  id: string;
  items: OrderItems;
}

export interface OrderUpdatedEvent extends Event {
  subject: 'order:updated';
  data: OrderUpdatedEventData;
}
