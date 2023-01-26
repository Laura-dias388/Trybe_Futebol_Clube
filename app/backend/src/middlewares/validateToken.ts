import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../auth/validateToken';

const validateTokenMatches = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization !== process.env.TOKEN) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const verifyTokenForMatches = validateToken(authorization as string);
  if (!verifyTokenForMatches) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  req.body.user = verifyTokenForMatches;
  next();
};

export default validateTokenMatches;
