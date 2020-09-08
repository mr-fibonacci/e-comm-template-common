import { Event } from './base-event';
import { OrderItems } from '../types/custom-types';

interface ItemsReservedEventData {
  id: string;
  items: OrderItems;
}

export interface ItemsReservedEvent extends Event {
  subject: 'items:reserved';
  data: ItemsReservedEventData;
}
