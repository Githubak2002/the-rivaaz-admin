// import { NextResponse } from 'next/server';
// import cloudinary from '@/lib/cloudinary';


// // Function to upload the image to Cloudinary
// const uploadToCloudinary = async (fileUri, fileName) => {
//   try {
//     const result = await cloudinary.uploader.upload(fileUri, {
//       invalidate: true,
//       resource_type: "auto",
//       public_id: fileName,
//       folder: "product-images",
//       use_filename: true,
//     });
//     return { success: true, result };
//   } catch (error) {
//     return { success: false, error };
//   }
// };

// export async function POST(req) {
//   const formData = await req.formData();

//   console.log("form data - ",formData);

//   const file = formData.get("file");

//   if (!file) {
//     return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
//   }

//   const fileBuffer = await file.arrayBuffer();
//   const mimeType = file.type;
//   const base64Data = Buffer.from(fileBuffer).toString("base64");
//   const fileUri = `data:${mimeType};base64,${base64Data}`;

//   const res = await uploadToCloudinary(fileUri, file.name);

//   if (res.success && res.result) {
//     return NextResponse.json({ message: "success", imgUrl: res.result.secure_url });
//   } else {
//     return NextResponse.json({ message: "failure", error: res.error });
//   }
// }

// ============ upload multiple files ============ 

import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const uploadToCloudinary = async (fileUri, fileName, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
      public_id: fileName,
      folder: folderName,
      use_filename: true,
    });
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
};

export async function POST(req) {
  const formData = await req.formData();

  // console.log("formData : ",formData);

  const files = formData.getAll("file");
  const folderName = formData.get("folderName"); 

  if (!folderName) {
    return NextResponse.json({ message: "Folder name is required" }, { status: 400 });
  }

  if (files.length === 0) {
    return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
  }

  const uploadResults = await Promise.all(files.map(async (file) => {
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    return uploadToCloudinary(fileUri, file.name, folderName); 
  }));

  const successfulUploads = uploadResults.filter(res => res.success);
  const failedUploads = uploadResults.filter(res => !res.success);

  return NextResponse.json({ 
    message: "Upload complete", 
    successfulUploads, 
    failedUploads 
  });
}
