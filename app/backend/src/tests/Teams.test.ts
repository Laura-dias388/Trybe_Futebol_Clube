import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import {
  user,
  invalidEmail,
  invalidPassword,
  validUser,
  noEmail,
} from './mock/TeamsMockTest';
import User from '../database/models/Users';
import { ServiceLogin } from '../types';

chai.use(chaiHttp);

const { expect } = chai;
const VALIDATION_TOKEN = 'meu_token_valido';

describe("Testa a rota POST para login.", () => {
  describe("Testar se recebe status 400", () => {
    it("Retorna um status 400", async () => {
      const result = await chai.request(app).post('/login');

      expect(result.status).to.equal(400);
    });

    it("Testa se retorna uma mensagem de erro específica.", async () => {
      const result = await chai.request(app).post('/login');

      expect(result.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });

  describe("Testa se retorna um errro quando recebe um email inválido.", () => {
    beforeEach(async () => sinon.stub(User,
      'findOne').resolves(null));
    afterEach(() => sinon.restore());

    it("Testa se retorna um status 401.", async () => {
      const result = await chai.request(app)
      .post('/login').send(invalidEmail);

      expect(result.status).to.be.equal(401);
    });

    it("Testa se retorna uma menssagem de erro ao receber um email ou passowrd inválido.", async () => {
      const result = await chai.request(app).post('/login').send(invalidEmail);

      expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe("Testa se retorna false ao receber um password inválido.", () => {
    beforeEach(() => { 
      sinon.stub(Model, 'findOne').resolves(user as User);
      sinon.stub(bcrypt, 'compareSync').resolves(false);
    });
    afterEach(() => sinon.restore());

    it("Testa se retorna uma menssagem de erro ao receber um email ou passowrd inválido.", async () => {
      const result = await chai.request(app).post('/login').send(invalidPassword);

      expect(result.body).to.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe("Testa se o login é feito com sucesso.", () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(user as User);
      sinon.stub(bcrypt, 'compareSync').resolves (true);
      sinon.stub(jwt, 'sign').resolves(VALIDATION_TOKEN);
    });
    afterEach(() => sinon.restore());

    it("Testa se retorna um token válido.", async () => {
      const result = await chai.request(app).post("/login").send(validUser);

      expect(result.body).to.have.property('token');
    });

    it("Testa se retorna um status 200 ao obter sucesso na validação do usuário.", async () => {
      const result = await chai.request(app).post('/login').send(validUser);

      expect(result.status).to.equal(200);
    });

  });

  describe("Testa se aplicação falha ao passar dados imcopletos.", () => {
    beforeEach(() => sinon.stub(Model, 'findOne').rejects(user as ServiceLogin));
    afterEach(() => sinon.restore());

    it("Testa se retorna um status 400 quando o password não é passado.", async () => {
      const result = await chai.request(app).post('/login').send(noEmail);

      expect(result.status).to.equal(400);
    });

    it("Testa se retorna uma menssagem de erro quando algum campo não é preenchido.", async () => {
      const result = await chai.request(app).post('/login').send(noEmail);

      expect(result.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });
});

