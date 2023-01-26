import { Request, Response } from 'express';
import TeamsService from '../services/serviceTeams';

export default class TeamsController {
  static async functionGetTeams(_req: Request, res: Response): Promise<Response> {
    const getTeams = await TeamsService.functionGetTeams();
    if (!getTeams) {
      return res.status(404).json({ message: 'No teams found' });
    }
    return res.status(200).json(getTeams);
  }

  static async functionGetTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const getTeamById = await TeamsService.functionGetTeamById(Number(id));
    if (!getTeamById?.type) {
      return res.status(404).json({ message: getTeamById?.message });
    }
    return res.status(200).json(getTeamById.message);
  }
}
