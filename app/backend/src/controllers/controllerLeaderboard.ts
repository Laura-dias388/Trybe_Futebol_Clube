import { Request, Response } from 'express';
import LeaderboardService from '../services/serviceLeaderboard';
import result from '../helpers/leaderboard';
import { TypeLeaderboardWithTeams } from '../types';

export default class LeaderboardController {
  static async matchesAllTeams(_req: Request, res: Response): Promise<Response> {
    const resp = await LeaderboardService.matchesAllTeams();
    if (!resp) {
      return res.status(404).json({ type: 'error', message: 'No matches for these teams.' });
    }
    const resultComplet = result(resp as TypeLeaderboardWithTeams[]);
    return res.status(200).json(resultComplet);
  }
}
