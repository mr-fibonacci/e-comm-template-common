import mongoose from 'mongoose';

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
  quantity: number;
  price: number;
}

// interface for adding a product to a database
export interface ProductAttrs {
  name: string;
  category: ProductCategory;
  quantity: number;
  price: number;
  userId: string;
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  category: string;
  quantity: number;
  price: number;
  userId: string;
}

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
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
