import Team from '../database/models/Teams';

export default class TeamsService {
  static async functionGetTeams() {
    const getTeams = await Team.findAll();
    return getTeams;
  }

  static async functionGetTeamById(id: number) {
    const getTeamById = await Team.findByPk(id);
    if (!getTeamById) {
      return { type: null, message: getTeamById };
    }
    return { type: 'success', message: getTeamById };
  }
}
