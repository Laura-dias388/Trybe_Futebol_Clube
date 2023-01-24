import { Router } from 'express';
import TeamsController from '../controllers/controllerTeams';

const router = Router();

router.get('/', TeamsController.functionGetTeams);
router.get('/:id', TeamsController.functionGetTeamById);

export default router;
