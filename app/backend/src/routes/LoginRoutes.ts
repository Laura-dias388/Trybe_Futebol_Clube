import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginRoutes from '../controllers/controllerUser';

const router = Router();

router.post('/', validateLogin, LoginRoutes.functionLogin);
router.get('/validate', LoginRoutes.functionRegister);

export default router;
