import mongoose from 'mongoose';

const StatusSchema = new mongoose.Schema({
  value: { type: String, default: 'NO STATUS' },
});

export default mongoose.model('Status', StatusSchema);
