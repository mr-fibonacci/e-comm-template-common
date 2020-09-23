import { OrderItems } from '../../types/custom-types';
import { Event } from '../base-classes/base-event';

interface ItemsReservedEventData {
  id: string;
  items: OrderItems;
}

export interface ItemsReservedEvent extends Event {
  subject: 'items:reserved';
  data: ItemsReservedEventData;
}
