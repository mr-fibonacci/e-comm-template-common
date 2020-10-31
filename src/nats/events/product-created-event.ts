import { ProductCategory } from '../../types/custom-types';
import { Event } from '../base-classes/base-event';

interface ProductCreatedEventData {
  id: string;
  name: string;
  category: ProductCategory;
  inStock: number;
  price: number;
  userId: string;
}

export interface ProductCreatedEvent extends Event {
  subject: 'product:created';
  data: ProductCreatedEventData;
}
