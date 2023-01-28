import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import Team from '../database/models/Teams';
import { teams } from './mock/teams.mock';

//@ts-ignore
import chaiHttp = require('chai-http');
import LeaderboardService from '../services/serviceLeaderboard';

chai.use(chaiHttp);

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
  describe("Testa se retorna um erro quando recebe um email inválido.", () => {
    beforeEach(async () => sinon.stub(Team,
      'findOne').resolves(null));
    afterEach(() => sinon.restore());

    it("Testa se retorna um status 200.", async () => {
      const result = await chai.request(app)
      .post('/teams').send(teams[0]);

      expect(result.status).to.be.equal(200);
    });
  });

  it('Testa se retorna dados de classificação para todas as equipes', async () => {
    const leaderboard = await LeaderboardService.matchesAllTeams();
    expect(leaderboard.length).to.be.equal(2);
    expect(leaderboard[0].name).to.be.equal('Team A');
    expect(leaderboard[0].totalPoints).to.be.equal(3);
    expect(leaderboard[0].totalGames).to.be.equal(3);
    expect(leaderboard[0].totalVictories).to.be.equal(1);
    expect(leaderboard[0].totalDraws).to.be.equal(1);
    expect(leaderboard[0].totalLosses).to.be.equal(1);
    expect(leaderboard[0].goalsFavor).to.be.equal(5);
    expect(leaderboard[0].goalsOwn).to.be.equal(5);
    expect(leaderboard[0].goalsBalance).to.be.equal(0);
    expect(leaderboard[0].efficiency).to.be.equal("33.33");
  });

  it('Testa se retorna dados de classificação para uma equipe', async () => {
    const leaderboard = await LeaderboardService.awayTeams();
    expect(leaderboard.length).to.be.equal(1);
    expect(leaderboard[0].name).to.be.equal('Team A');
    expect(leaderboard[0].totalPoints).to.be.equal(3);
    expect(leaderboard[0].totalGames).to.be.equal(3);
    expect(leaderboard[0].totalVictories).to.be.equal(1);
    expect(leaderboard[0].totalDraws).to.be.equal(1);
    expect(leaderboard[0].totalLosses).to.be.equal(1);
    expect(leaderboard[0].goalsFavor).to.be.equal(5);
    expect(leaderboard[0].goalsOwn).to.be.equal(5);
    expect(leaderboard[0].goalsBalance).to.be.equal(0);
    expect(leaderboard[0].efficiency).to.be.equal("33.33");
  });
});
