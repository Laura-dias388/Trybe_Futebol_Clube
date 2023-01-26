import { NextFunction, Request, Response } from 'express';

const validateMatches = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({ message: 'false' });
  }
  next();
};

export default validateMatches;
