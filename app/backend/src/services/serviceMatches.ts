import Team from '../database/models/Teams';
import Match from '../database/models/Matches';

export default class MatchesServices {
  static async functionGetMatches() {
    const getMatches = await Match.findAll({
      include: [
        { model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return getMatches;
  }

  static async functionGetMatchById(id: number) {
    const getMatchById = await Match.findByPk(id);
    if (!getMatchById) {
      return { type: null, message: getMatchById };
    }
    return { type: 'success', message: getMatchById };
  }
}
