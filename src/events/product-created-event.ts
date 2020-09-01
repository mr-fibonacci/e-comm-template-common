import { Event } from './base-event';
import { ProductDoc } from '../schemas/product';

export interface ProductCreatedEvent extends Event {
  subject: 'product:created';
  data: ProductDoc;
}
