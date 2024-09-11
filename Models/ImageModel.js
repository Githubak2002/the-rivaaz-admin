import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  urls: [String], // Array of image URLs
});

const ImageModel = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default ImageModel;