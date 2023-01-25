import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './Matches';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING(255),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',

});

Match.belongsTo(
  Team,
  { foreignKey: 'homeTeamId',
    as: 'homeTeam' },
);
Match.belongsTo(
  Team,
  { foreignKey: 'awayTeamId',
    as: 'awayTeam' },
);
/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
Team.hasMany(Match, { foreignKey: 'id', as: 'matchId' });

export default Team;
