import { Router } from 'express';
import MatchesController from '../controllers/controllerMatches';

const router = Router();

router.get('/', MatchesController.functionGetMatches);
router.get('/?', MatchesController.getMatchByQuery);

export default router;
