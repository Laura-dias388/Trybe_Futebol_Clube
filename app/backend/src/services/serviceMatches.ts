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

  static async functionGetMatchByQueries(q: string) {
    const inProgress = q === 'true';
    if (typeof inProgress !== 'boolean') return { type: 'error', message: 'false' };
    const getMatchByQuery = await Match.findAll({
      where: { inProgress },
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
    return getMatchByQuery;
  }
}
