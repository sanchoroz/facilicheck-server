import mongoose from 'mongoose';

const FacilitySchema = new mongoose.Schema({
  facilityName: { type: String, unique: true },
  sku: { type: String, unique: true },
  standard: { type: String },
  status: { type: String },
  manufacturer: { type: String },
  isFailed: { type: Boolean, default: false },
  issueDescription: { type: String },
});

export default mongoose.model('Facility', FacilitySchema);
