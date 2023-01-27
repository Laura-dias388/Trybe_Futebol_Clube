import * as chai from 'chai';
import * as sinon from 'sinon';

import { app } from '../app';
import Team from '../database/models/Teams';

chai.use(require('chai-http'));

const { expect } = chai;

describe("Testando Teams.", () => {

  it("Testa se recebe status 400", async () =>{
    const resp = await chai.request(app).post('/teams');

    expect(resp.status).to.equal(404);
  });
  
  it("Testa se retorna uma mensagem de erro específica.", async () => {
    const resp = await chai.request(app).post('/teams');

    expect(resp.body).to.deep.equal({ message: 'No teams found' });
  });
});