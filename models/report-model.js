import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ReportModel = new mongoose.Schema(
  {
    garden: { type: Schema.Types.ObjectId, ref: 'Garden' },
    checks: [{ type: Schema.Types.ObjectId, ref: 'MonthlyChecks' }],
  },
  { timestamps: true },
);

export default mongoose.model('MonthlyCheck', UserSchema);
