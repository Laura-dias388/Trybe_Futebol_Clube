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

  static async functionPostMatch(data: TypeMatchesWithTeams)
    : Promise<{ type: string, message: string | Match }> {
    const { awayTeamId, homeTeamId } = data;
    const getMatch = await Match.findByPk(awayTeamId);
    const getMatch2 = await Match.findByPk(homeTeamId);
    if (!getMatch || !getMatch2) return { type: 'error', message: 'false' };
    const postMatch = await Match.create({ ...data, inProgress: true });
    return { type: 'error', message: postMatch };
  }
}
