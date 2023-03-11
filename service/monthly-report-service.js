import MonthlyReport from '../models/monthly-report-model.js';
import ApiErrors from '../exceptions/api-errors.js';

class MonthlyReportService {
  async create(reportData) {
    const { reportNumber } = reportData;
    console.log('report number', reportNumber);
    const candidate = await MonthlyReport.findOne({ reportNumber });

    if (candidate) {
      throw ApiErrors.BadRequest(`report with this id: ${reportNumber} already exists`);
    }

    const newReport = new MonthlyReport(reportData);
    const savedReport = await newReport.save();

    console.log('savedReport: ', savedReport);
    return savedReport;
  }

  async update(id, data) {
    const updatedFacility = await MonthlyReport.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );
    return updatedFacility;
  }

  async delete(id) {
    const deletedFacility = await MonthlyReport.findByIdAndDelete(id);
    return deletedFacility;
  }

  async getAllReports() {
    console.log('hello');
    const reports = await MonthlyReport.find();
    return reports;
  }

  async getReport(id) {
    const report = await MonthlyReport.findOne({ id });
    return report;
  }
}

export default new MonthlyReportService();
