import { Event } from './base-event';
import { OrderStatus } from './order-status';
import { OrderItems } from '../../../common/src/index';

export interface OrderCreatedEventData {
  id: string;
  version: number;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  items: OrderItems;
}

export interface OrderCreatedEvent extends Event {
  subject: 'order:created';
  data: OrderCreatedEventData;
}
