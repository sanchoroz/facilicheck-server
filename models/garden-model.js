import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const GardenSchema = new mongoose.Schema({
  siteName: { type: String, unique: true, required: true },
  address: { type: String, unique: true, required: true },
  serialNumber: { type: String, unique: true, required: true },
  siteType: { type: String },
  groundCover: { type: String },
  facilities: [{ type: Schema.Types.ObjectId, ref: 'Facility' }],
  hasFailedFacilities: { type: Boolean, default: false },
  imageUrl: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2017/04/26/21/22/playground-2263827_960_720.jpg',
  },
});

export default mongoose.model('Garden', GardenSchema);
