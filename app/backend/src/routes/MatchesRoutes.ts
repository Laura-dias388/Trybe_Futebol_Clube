import { Router } from 'express';
import MatchesController from '../controllers/controllerMatches';

const router = Router();

router.get('/', MatchesController.functionGetMatches);

export default router;
