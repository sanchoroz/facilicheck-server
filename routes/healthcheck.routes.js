import Router from 'express';

const router = new Router();

router.get('/health', async (req, res, next) => {
  res.json({ status: 'OK' });
});

export default router;
