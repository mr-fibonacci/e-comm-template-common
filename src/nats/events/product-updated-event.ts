import { ProductCategory } from '../../types/custom-types';
import { Event } from '../base-classes/base-event';

interface ProductUpdatedEventData {
  id: string;
  name: string;
  category: ProductCategory;
  inStock: number;
  price: number;
  version: number;
}

export interface ProductUpdatedEvent extends Event {
  subject: 'product:updated';
  data: ProductUpdatedEventData;
}
