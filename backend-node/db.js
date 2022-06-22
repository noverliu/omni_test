import { Sequelize } from 'sequelize';

const { PG_HOST, PG_PORT = 5432, PG_USR, PG_PWD, PG_DB } = process.env;

const sequelize = new Sequelize(PG_DB, PG_USR, PG_PWD, {
  host: PG_HOST,
  dialect: 'postgres',
  port: PG_PORT
});

export default sequelize;
