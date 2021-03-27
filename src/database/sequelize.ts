import { Sequelize } from 'sequelize';
import db from '../config/db';

const { database, user, password, host, port, connectionLimit } = db.mysql;

const sequelize = new Sequelize(database, user, password || null, {
  host,
  port,
  dialect: 'mysql',
  pool: {
    max: connectionLimit,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err: any) => {
    console.error(err);
    throw err;
  });

export default sequelize;
