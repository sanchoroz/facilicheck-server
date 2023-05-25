import Router from 'express';
import FacilityController from '../controllers/FacilityController.js';
import { rolesAuth } from '../middlewares/roles.js';

const router = new Router();

router.post('/create/:gardenId', rolesAuth(['ADMIN', 'MODERATOR']), FacilityController.create);
router.put('/update/:id', rolesAuth(['ADMIN', 'MODERATOR']), FacilityController.update);
router.put('/delete/:id', rolesAuth(['ADMIN']), FacilityController.delete);
router.get('/facilities', rolesAuth(['ADMIN','MODERATOR']), FacilityController.getFacilities);
router.get('/:id', rolesAuth(['ADMIN','MODERATOR']), FacilityController.getFacility);

export default router;
