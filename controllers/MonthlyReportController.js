import monthlyReportService from '../service/monthly-report-service.js';

class MonthlyReportController {
  async create(req, res, next) {
    try {
      const monthlyReportData = await monthlyReportService.create(req.body);
      return res.json({ 'Monthly report created': monthlyReportData });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedGarden = await monthlyReportService.delete(req.params.id);
      return res.json(`Garden: ${deletedGarden._id} deleted`);
    } catch (error) {
      next(error);
    }
  }

  async getReports(req, res, next) {
    try {
      const reports = await monthlyReportService.getAllReports();
      return res.json(reports);
    } catch (error) {
      next(error);
    }
  }

  async getReport(req, res, next) {
    try {
      const garden = await monthlyReportService.getGarden(req.params.id);
      return res.json(garden);
    } catch (error) {
      next(error);
    }
  }
}

export default new MonthlyReportController();
