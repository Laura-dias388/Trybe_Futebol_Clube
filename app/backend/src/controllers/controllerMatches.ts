import { Request, Response } from 'express';
import MatchesService from '../services/serviceMatches';

export default class MatchesController {
  static async functionGetMatches(_req: Request, res: Response) {
    const get = await MatchesService.functionGetMatches();
    return res.status(200).json(get);
  }
}
