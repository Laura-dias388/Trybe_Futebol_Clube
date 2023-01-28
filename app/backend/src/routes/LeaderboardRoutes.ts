import { Router } from 'express';
import controllerLeaderboard from '../controllers/controllerLeaderboard';

const router = Router();

router.get('/home', controllerLeaderboard.matchesAllTeams);
router.get('/away', controllerLeaderboard.awayTeams);

export default router;
