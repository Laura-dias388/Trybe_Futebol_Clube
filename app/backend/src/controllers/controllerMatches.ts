import { Request, Response } from 'express';
import MatchesService from '../services/serviceMatches';

export default abstract class MatchesController {
  static async functionGetMatches(req: Request, res: Response) {
    if (req.query.inProgress) return MatchesController.getMatchByQuery(req, res);
    const get = await MatchesService.functionGetMatches();
    return res.status(200).json(get);
  }

  static async getMatchByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress !== 'string') {
      return res.status(400).json({ message: 'false' });
    }
    if (inProgress !== 'true' && inProgress !== 'false') {
      return res.status(400).json({ message: 'false' });
    }
    const get = await MatchesService.functionGetMatchByQueries(inProgress);
    return res.status(200).json(get);
  }

  static async functionGetMatchByPost(req: Request, res: Response) {
    const result = await MatchesService.functionGetMatchByPost(req.body);
    if (result.type === 'error') {
      return res.status(404).json({ message: result.message });
    }
    return res.status(201).json(result.message);
  }

  static async functionForMatchByFinish(req: Request, res: Response) {
    const { id } = req.params;
    const result = await MatchesService.functionForMatchByFinish(Number(id));
    if (result.type === 'error') {
      return res.status(400).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message });
  }

  static async functionForMatchByUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const result = await MatchesService.functionForMatchByUpdate(Number(id), req.body);
    if (result.type === 'error') {
      return res.status(400).json({ message: result.message });
    }
    return res.status(200).json({ message: result.message });
  }
}

// Requisito desenvolvido com ajuda de Luíde Pires T-23 Tribo A;
// Requisito desenvolvido com ajuda de Ewerton Ferreira T-23 Tribo A;
