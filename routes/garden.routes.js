import Router from 'express';
import GardenController from '../controllers/GardenController.js';
import { rolesAuth } from '../middlewares/roles.js';

const router = new Router();

router.post('/create', rolesAuth(['ADMIN']), GardenController.create);
router.get('/gardens', rolesAuth(['ADMIN']), GardenController.getGardens);
router.put('/update/:id', rolesAuth(['ADMIN']), GardenController.update);
router.put('/delete/:id', rolesAuth(['ADMIN']), GardenController.delete);
router.get('/:id', rolesAuth(['ADMIN']), GardenController.getGarden);

export default router;
