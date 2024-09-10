import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const {email,password} = await req.json();
    console.log("email: ",email);
    console.log("pass: ",password);
    if(email === "ok@c.in" && password === "123"){
      return NextResponse.json({msg:"Login Success", success:true})
    }
    else
      return NextResponse.json({msg:"Invalid Credentials", success:false})  
  } catch (error) {
    console.log("Error in login → ",error);
    return NextResponse.json({msg:"Error in login" , success:false})
  }
}
