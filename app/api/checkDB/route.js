import connectDb from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const con = await connectDb();
  return new NextResponse('connected');
  // return NextResponse.json({msg:'connected',result:true});
}