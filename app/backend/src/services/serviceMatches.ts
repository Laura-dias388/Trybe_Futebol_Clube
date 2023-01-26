import Team from '../database/models/Teams';
import Match from '../database/models/Matches';
import { TypeMatchesWithTeams } from '../types';

export default abstract class MatchesServices {
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

  static async functionForMatchByFinish(id: number) {
    const [getMatchById] = await Match.update({ inProgress: false }, { where: { id } });
    if (!getMatchById) {
      return { type: 'error', message: 'This match is already over' };
    }
    return { type: null, message: 'Finished' };
  }

  static async functionForMatchByUpdate(id: number, body: TypeMatchesWithTeams) {
    const updatePatch = await Match.update({ ...body }, { where: { id } });
    if (updatePatch[0] === 0) {
      return { type: 'error', message: 'This match is already over' };
    }
    return { type: null, message: 'Updated' };
  }
}
// Requisito desenvolvido com ajuda de Luíde Pires T-23 Tribo A;
