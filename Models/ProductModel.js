import mongoose, { Schema } from 'mongoose'

// Define the Product schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  previousPrice: {
    type: Number,
    required: false // Optional; useful for discount purposes
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: [String], // Array of strings for multiple image URLs
    required: false // Optional field
  },
  stock: {
    type: Number,
    required: true
  }
});


// Create the Product model based on the schema & Check if the model already exists
// const ProductModel = mongoose.models.ProductModel || mongoose.model('ProductModel', productSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
