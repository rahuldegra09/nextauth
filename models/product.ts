

import mongoose, { Schema, models } from "mongoose";

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [
    {
      id: Number,
      title: String,
      description: String,
      price: Number,
      discountPercentage: Number,
      rating: Number,
      stock: Number,
      brand: String,
      category: String,
      thumbnail: String,
      images: [String],
    },
  ],
  total: Number,
  skip: Number,
  limit: Number,
});
// Reference the existing collection without explicitly creating it
const Product = models.Product || mongoose.model("Product", productSchema, "products");

export default Product;
