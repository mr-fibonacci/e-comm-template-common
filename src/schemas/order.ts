import mongoose from 'mongoose';
import { ProductAttrs } from './product';

const OrderStatuses = [
  'created',
  'cancelled',
  'awaiting:payment',
  'complete',
] as const;

type OrderStatus = typeof OrderStatuses[number];
export interface OrderUpdateAttrs {
  items: ProductAttrs[];
}
export interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  items: ProductAttrs[];
}

export interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  items: ProductAttrs[];
}

export const orderSchema = new mongoose.Schema(
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
    items: {
      type: Array,
      required: true,
    },
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

// mongoose requires extra hack to allow type enforcing
// orderSchema.statics.myUpdate = async function (
//   id: string,
//   attrs: OrderUpdateAttrs
// ) {
//   return await this.findByIdAndUpdate(id, attrs, { new: true });
// };
