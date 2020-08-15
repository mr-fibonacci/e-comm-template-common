import { Document, Schema } from 'mongoose';
import { ProductAttrs, ProductDoc } from './product';

const OrderStatuses = [
  'created',
  'cancelled',
  'awaiting:payment',
  'complete',
] as const;

type OrderStatus = typeof OrderStatuses[number];

// interface for an order item
export interface ProductItem {
  quantity: number;
  id: string;
}

export interface OrderItems {
  items: ProductItem[];
  id: string;
}

export interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  items: ProductAttrs[];
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
