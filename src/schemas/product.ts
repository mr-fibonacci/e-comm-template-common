import mongoose from 'mongoose';

export interface ProductAttrs {
  name: string;
  category: string;
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
