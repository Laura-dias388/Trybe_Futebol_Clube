import { TypeLeaderboard } from '../types';
import Match from '../database/models/Matches';
import Team from '../database/models/Teams';

const sumOfHomeTeamPoints = (a: number, c: Match): number => {
  if (c.homeTeamGoals > c.awayTeamGoals) return a + 3;
  if (c.homeTeamGoals === c.awayTeamGoals) return a + 1;
  return a;
};

const totalHomeTeamWins = (a: number, c: Match): number => {
  if (c.homeTeamGoals > c.awayTeamGoals) return a + 1;
  return a;
};

const totalTies = (a: number, c: Match): number => {
  if (c.homeTeamGoals === c.awayTeamGoals) return a + 1;
  return a;
};

const totalHomeTeamLosses = (a: number, c: Match): number => {
  if (c.homeTeamGoals < c.awayTeamGoals) return a + 1;
  return a;
};
const homeGoals = (a: number, c: Match): number => a + c.homeTeamGoals;
const homeGoalsAway = (a: number, c: Match): number => a + c.awayTeamGoals;
const totalAwaySumOfHome = (a: number, c: Match): number => {
  if (c.homeTeamGoals < c.awayTeamGoals) return a + 3;
  if (c.homeTeamGoals === c.awayTeamGoals) return a + 1;
  return a;
};

const awayWins = (a: number, c: Match): number => {
  if (c.homeTeamGoals < c.awayTeamGoals) return a + 1;
  return a;
};

const awayGamesLost = (a: number, c: Match): number => {
  if (c.homeTeamGoals > c.awayTeamGoals) return a + 1;
  return a;
};

const goalsAwayFromHome = (a: number, c: Match): number => a + c.awayTeamGoals;

const awayGoals = (a: number, c: Match): number => a + c.homeTeamGoals;

export default class LeaderboardService {
  static async matchesForLeaderboards(id:number): Promise<Match[]> {
    const allMatches = await Match.findAll({ where: { homeTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  static async teamsHome(): Promise<Match[][]> {
    const allTeams = await Team.findAll();
    if (allTeams.length === 0) return [];
    const resp = allTeams.map((team) => LeaderboardService.matchesForLeaderboards(team.id));
    const match = await Promise.all(resp);
    return match;
  }

  static async matchesAllTeams(): Promise<TypeLeaderboard[]> {
    const allTeams = await Team.findAll();
    if (allTeams.length === 0) return [];
    const data = await LeaderboardService.teamsHome();
    const teamsResult = data.map((team, i) => ({
      name: allTeams[i].teamName,
      totalPoints: team.reduce(sumOfHomeTeamPoints, 0),
      totalGames: team.length,
      totalVictories: team.reduce(totalHomeTeamWins, 0),
      totalDraws: team.reduce(totalTies, 0),
      totalLosses: team.reduce(totalHomeTeamLosses, 0),
      goalsFavor: team.reduce(homeGoals, 0),
      goalsOwn: team.reduce(homeGoalsAway, 0),
      goalsBalance: team.reduce(homeGoals, 0) - team.reduce(homeGoalsAway, 0),
      efficiency: ((team.reduce(sumOfHomeTeamPoints, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
    return teamsResult;
  }

  static async getMatchesByAwayTeam(id:number): Promise<Match[]> {
    const allMatches = await Match.findAll({ where: { awayTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  static async getAwayTeams(): Promise<Match[][]> {
    const teams = await Team.findAll();
    if (teams.length === 0) return [];
    const resp = teams.map((team) => LeaderboardService.getMatchesByAwayTeam(team.id));
    const result = await Promise.all(resp);
    return result;
  }

  static async awayTeams(): Promise<TypeLeaderboard[]> {
    const allTeams = await Team.findAll();
    if (allTeams.length === 0) return [];
    const data = await LeaderboardService.getAwayTeams();
    const answerArray = data.map((team, i) => ({
      name: allTeams[i].teamName,
      totalPoints: team.reduce(totalAwaySumOfHome, 0),
      totalGames: team.length,
      totalVictories: team.reduce(awayWins, 0),
      totalDraws: team.reduce(totalTies, 0),
      totalLosses: team.reduce(awayGamesLost, 0),
      goalsFavor: team.reduce(goalsAwayFromHome, 0),
      goalsOwn: team.reduce(awayGoals, 0),
      goalsBalance: team.reduce(goalsAwayFromHome, 0) - team.reduce(awayGoals, 0),
      efficiency: ((team.reduce(totalAwaySumOfHome, 0) / (team.length * 3)) * 100).toFixed(2),
    }));

    return answerArray;
  }
}
