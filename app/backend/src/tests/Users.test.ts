import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste login users.', () => {
  it('Teste se tem o atributo email.', () => {

    const e = Users.getAttributes();

    expect(e).to.have.property('email');
    expect(e.email.type.constructor.name).to.equal('STRING');
  });

  it('Teste se tem o atributo password.', () => {

    const pass = Users.getAttributes();

    expect(pass).to.have.property('password');
    expect(pass.password.type.constructor.name).to.equal('STRING');
  });

  it('Teste se tem o atributo role.', () => {

    const lR = Users.getAttributes();

    expect(lR).to.have.property('role');
    expect(lR.role.type.constructor.name).to.equal('STRING');
  });

  it('Teste se tem o atributo name.', () => {

    const n = Users.getAttributes();

    expect(n).to.have.property('name');
    expect(n.name.type.constructor.name).to.equal('STRING');
  });

})
// Requisito desenvolvido com ajuda de Juliana Martinelli T-23 Tribo A;
