import { NextFunction, Request, Response } from 'express';

const validateMatches = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

const validateMatchesData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with empty fields' });
  }
  return next();
};

export {
  validateMatches,
  validateMatchesData,
};
