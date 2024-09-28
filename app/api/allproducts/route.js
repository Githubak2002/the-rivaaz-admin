import connectDb from "@/lib/mongoDB";
import Product from "@/Models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb(); 
    const allProducts = await Product.find({});
    return NextResponse.json({ noOfProducts: allProducts.length, msg: "All Products",  result: true, allProducts }); 
  } catch (error) {
    console.error("Error in fetching products ",error); 
    return NextResponse.json({ msg: "Error fetching products", result: false }, { status: 500 }); 
  }
}
