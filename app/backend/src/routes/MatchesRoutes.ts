import { Router } from 'express';
import { validateMatches, validateMatchesData } from '../middlewares/validateMatches';
import validateTokenMatches from '../middlewares/validateToken';
import MatchesController from '../controllers/controllerMatches';

const router = Router();

router.get('/', MatchesController.functionGetMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.post(
  '/',
  validateTokenMatches,
  validateMatchesData,
  validateMatches,
  MatchesController.functionGetMatchByPost,
);

router.patch('/:id/finish', MatchesController.functionForMatchByFinish);
router.patch('/:id', MatchesController.functionForMatchByUpdate);

export default router;
