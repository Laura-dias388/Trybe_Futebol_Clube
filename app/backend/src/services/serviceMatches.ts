import Team from '../database/models/Teams';
import Match from '../database/models/Matches';
import { TypeMatchesWithTeams } from '../types';

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

  static async functionGetMatchByPost(body: TypeMatchesWithTeams) {
    const { homeTeamId, awayTeamId } = body;
    const homeTeam = await Match.findByPk(homeTeamId);
    const awayTeam = await Match.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { type: 'error', message: 'There is no team with such id!' };
    }
    const { dataValues } = await Match.create({ ...body, inProgress: true });
    return { type: null, message: dataValues };
  }
}
// Requisito desenvolvido com ajuda de Luíde Pires T-23 Tribo A;
