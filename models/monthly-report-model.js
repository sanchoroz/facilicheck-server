import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const MonthlyReportSchema = new mongoose.Schema(
  {
    gardenName: { type: String },
    reporter: { type: String },
    reportNumber: { type: String },
    date: { type: Date },
    previousIssue: { type: String },
    areaStatus: { type: String },
    facilities: { type: Object },
  },
  { timestamps: true },
);

export default mongoose.model('MonthlyReport', MonthlyReportSchema);
