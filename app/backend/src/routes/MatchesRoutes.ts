import { Router } from 'express';
// import validateMatches from '../middlewares/validateMatches';
import { validateToken } from '../auth/validateToken';
import MatchesController from '../controllers/controllerMatches';

const router = Router();

router.get('/', MatchesController.functionGetMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.post('/', validateToken, MatchesController.functionPostMatch);

export default router;
