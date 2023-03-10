import Router from 'express';
import UserController from '../controllers/UserController.js';
import { auth } from '../middlewares/auth.js';
import { rolesAuth } from '../middlewares/roles.js';
import { validateUserRegister, validateUserLogin } from '../middlewares/validators.js';
import Role from '../models/role-model.js';

const router = new Router();

router.post('/registration', validateUserRegister, UserController.register);
router.post('/login', validateUserLogin, UserController.login);
router.post('/logout', UserController.logout);
router.get('/me', auth, UserController.me);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', rolesAuth(['ADMIN']), UserController.getUsers);

//
router.get('/role', async (req, res, next) => {
  const moderator = new Role({
    value: 'MODERAddTOR',
  });

  await moderator.save();
  return res.json({ moderator });
});

export default router;
