import { OrderItems } from '../../types/custom-types';
import { Event } from '../base-classes/base-event';
import { OrderStatus } from '../order-status';

interface ItemsReservedEventData {
  id: string;
  version: number;
  items: OrderItems;
  status: OrderStatus;
}

export interface ItemsReservedEvent extends Event {
  subject: 'items:reserved';
  data: ItemsReservedEventData;
}
