import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Shorten extends Model{ }

Shorten.init({
  originLink: {
    type: DataTypes.STRING,
    allowNull:false
  },
  shortKey: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  }
}, {
  sequelize
})

Shorten.sync();

export default Shorten;
