import { Request, Response } from 'express';
import LeaderboardService from '../services/serviceLeaderboard';
import result from '../helpers/leaderboard';
import { TypeLeaderboardWithTeams, TypeError } from '../types';

export default class LeaderboardController {
  static async matchesAllTeams(_req: Request, res: Response) {
    try {
      const resp = await LeaderboardService.matchesAllTeams();
      const resultComplet = result(resp as TypeLeaderboardWithTeams[]);
      return res.status(200).json(resultComplet);
    } catch (error) {
      return res.status(500).json({ type: 'error', message: (error as TypeError) });
    }
  }

  static async awayTeams(_req: Request, res: Response) {
    try {
      const resp = await LeaderboardService.awayTeams();
      if (!resp) {
        throw new Error('No matches for these teams.');
      }
      const resultComplet = result(resp as TypeLeaderboardWithTeams[]);
      const resultCompleted = resultComplet.filter((team) => team.totalGames > 0);
      if (!resultCompleted.length) {
        throw new Error('No matches for these teams.');
      }
      return res.status(200).json(resultComplet);
    } catch (error) {
      return res.status(404).json({ type: 'error', message: error as TypeError });
    }
  }
}
