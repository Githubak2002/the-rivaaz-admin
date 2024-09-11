//  ========= app/api/addProduct ===========
import connectDb from '@/lib/mongoDB';
import Product from '@/Models/ProductModel';
import { NextResponse } from 'next/server';


// POST requests - Post a NEW PRODUCT  
export async function POST(req) {
  try {
    await connectDb();
    const { title, price, previousPrice, description, category, image, stock } = await req.json();

    // Validate input (basic validation example)
    if (!title || !price || !description || !category || !stock) {
      return NextResponse.json({ error: 'Missing required fields' ,status: 400 });
    }

    // Create a new product
    const newProduct = new Product({
      title,
      price,
      previousPrice,
      description,
      category,
      image,
      stock,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Return a success response
    return NextResponse.json({ product: savedProduct }, {msg: "Added new Product", result: true, status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal server error', result: false, status: 500 });
  }
}
