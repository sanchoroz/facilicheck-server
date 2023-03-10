import Router from 'express';
import FacilityController from '../controllers/FacilityController.js';
import { rolesAuth } from '../middlewares/roles.js';

const router = new Router();

router.post('/create/:gardenId', rolesAuth(['ADMIN']), FacilityController.create);
router.put('/update/:id', rolesAuth(['ADMIN']), FacilityController.update);
router.put('/delete/:id', rolesAuth(['ADMIN']), FacilityController.delete);
router.get('/facilities', rolesAuth(['ADMIN']), FacilityController.getFacilities);
router.get('/:id', rolesAuth(['ADMIN']), FacilityController.getFacility);

export default router;
