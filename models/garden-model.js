import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const GardenSchema = new mongoose.Schema({
  siteName: { type: String, unique: true, required: true },
  address: { type: String, unique: true, required: true },
  serialNumber: { type: String, unique: true, required: true },
  siteType: { type: String },
  groundCover: { type: String },
  facilities: [{ type: Schema.Types.ObjectId, ref: 'Facility' }],
});

export default mongoose.model('Garden', GardenSchema);
