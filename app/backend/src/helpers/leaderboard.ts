import { TypeLeaderboardWithTeams } from '../types';

export default (array: TypeLeaderboardWithTeams[]) => {
  array.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return array;
};
