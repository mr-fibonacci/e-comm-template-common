import { Document, Schema } from 'mongoose';
import { OrderDoc } from './order';

const ReadOnlyCategories = [
  'laptops',
  'electronics',
  'home & garden',
  'blah blah blah',
] as const;

// a hack so that I don't have to rewrite the ReadOnlyCategories as a non-read-only array
export const productCategories = ReadOnlyCategories.map((item) => item);

export type ProductCategory = typeof ReadOnlyCategories[number];

// interface for the product form
export interface ProductReqAttrs {
  name: string;
  category: ProductCategory;
  inStock: number;
  price: number;
}

// interface for adding a product to a database
export interface ProductAttrs {
  name: string;
  category: ProductCategory;
  inStock: number;
  price: number;
  userId: string;
}

export interface ProductDoc extends Document {
  name: string;
  category: string;
  inStock: number;
  price: number;
  userId: string;
  pendingUpdate: ProductReqAttrs;
  activeOrders: OrderDoc[];
}

export const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    userId: {
      type: String,
      required: true,
    },
    pendingUpdate: Object,
    activeOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
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
