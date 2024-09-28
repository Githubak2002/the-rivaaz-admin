import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(req) {
  const { folderName } = await req.json();

  if (!folderName) {
    return NextResponse.json({ message: "Folder name is required" }, { status: 400 });
  }

  try {
    // Delete all resources in the specified folder
    const result = await cloudinary.api.delete_resources_by_prefix(folderName, { resource_type: 'image' });

    // Optionally, delete the empty folder afterwards
    await cloudinary.api.delete_folder(folderName);

    return NextResponse.json({
      message: "Folder deleted successfully",
      result
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete folder", error: error.message }, { status: 500 });
  }
}
