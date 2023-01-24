import { SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

type TypeToken = {
  id?: number,
  username: string,
  vocation: string,
  level: number,
};

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

export const createToken = (loginWithoutPassword: TypeToken) => {
  const token = jwt.sign({ data: loginWithoutPassword }, secret, jwtConfig);
  return token;
};

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return false;
  }
};
