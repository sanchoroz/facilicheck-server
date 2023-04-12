import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const FacilitySchema = new mongoose.Schema({
  facilityName: { type: String, unique: true },
  garden: { type: Schema.Types.ObjectId, ref: 'Garden' },
  sku: { type: String, unique: true },
  standard: { type: String },
  manufacturer: { type: String },
  manufacturerType: { type: String },
  basis: { type: String },
  imageUrl: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2017/04/26/21/22/playground-2263827_960_720.jpg',
  },
  isFailed: { type: Boolean, default: false },
  issueDescription: { type: String },
});

export default mongoose.model('Facility', FacilitySchema);
