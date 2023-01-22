import { Model, INTEGER, STRING } from 'sequelize';// fonte course tipagem estática e genérics
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: STRING(255),
    allowNull: false,
  },
  author: {
    type: STRING(100),
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'comments',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

export default User;
