import { Request, Response } from 'express';
import LoginService from '../services/serviceLogin';

export default abstract class LoginController {
  static async functionLogin(req: Request, res: Response) {
    const { type, message } = await LoginService.functionLogin(req.body);
    if (type) {
      return res.status(401).json({ message });
    }
    return res.status(200).json({ token: message });
  }

  static async functionRegister(req: Request, res: Response) {
    const { type, message } = await LoginService
      .functionRegister(req.headers.authorization as string);
    if (type) {
      return res.status(401).json({ message });
    }
    return res.status(200).json({ role: message });
  }
}
