import { Document, Schema } from 'mongoose';
import { ProductDoc } from './product';

const OrderStatuses = ['pending', 'cancelled', 'finalized'] as const;

type OrderStatus = typeof OrderStatuses[number];

// interface for an order item
export interface ProductItem {
  quantity: number;
  id: string;
  version: number;
}

export type OrderItems = ProductItem[];

export interface OrderAttrs {
  userId: string;
  items: OrderItems;
}

export interface OrderDoc extends Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  items: ProductDoc[];
}

export const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
