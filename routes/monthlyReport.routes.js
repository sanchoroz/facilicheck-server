import Router from 'express';
import MonthlyReportController from '../controllers/MonthlyReportController.js';
import { rolesAuth } from '../middlewares/roles.js';

const router = new Router();

router.post('/monthly/create', rolesAuth(['ADMIN']), MonthlyReportController.create);
router.get('/monthly/report/:gardenId', rolesAuth(['ADMIN']), MonthlyReportController.getReport);
router.get('/monthly/all', rolesAuth(['ADMIN']), MonthlyReportController.getReports);

export default router;
