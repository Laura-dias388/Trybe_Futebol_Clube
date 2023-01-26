import { Router } from 'express';
import validateMatches from '../middlewares/validateMatches';
import validateTokenMatches from '../middlewares/validateToken';
import MatchesController from '../controllers/controllerMatches';

const router = Router();

router.get('/', MatchesController.functionGetMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.post('/', validateTokenMatches, validateMatches, MatchesController.functionGetMatchByPost);

export default router;
