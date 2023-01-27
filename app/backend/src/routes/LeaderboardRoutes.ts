import { Router } from 'express';
import controllerLeaderboard from '../controllers/controllerLeaderboard';

const router = Router();

router.get('/', controllerLeaderboard.matchesAllTeams);
router.get('/home', controllerLeaderboard.matchesAllTeams);

export default router;
