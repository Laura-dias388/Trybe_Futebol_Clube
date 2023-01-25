import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/Users';
import { ServiceLogin, TypeLogin } from '../types/index';
import { createToken, validateToken } from '../auth/validateToken';

export default abstract class LoginService {
  static async functionLogin(data: ServiceLogin): Promise<TypeLogin> {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });

    if (!user) return { type: 'error', message: 'Incorrect email or password' };
    const { dataValues } = user;
    const passwordIsValid = bcrypt.compareSync(password, dataValues.password);

    if (!passwordIsValid) return { type: 'error', message: 'Incorrect email or password' };
    // delete dataValues.password;
    const { password: _, ...everythingWithoutPassowd } = dataValues;
    const token = createToken(everythingWithoutPassowd);
    return { type: null, message: token };
  }

  static async functionRegister(token: string) {
    const obj = validateToken(token) as JwtPayload;
    if (!obj) return { type: 'error', message: 'Token inválido' };
    const { role } = obj.data;
    console.log('testessssss');
    return { type: null, message: role };
  }
}

// Requisito feito com ajuda de Luídi Pires T-23 Tribo A;
