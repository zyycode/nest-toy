// config/db.ts
const prodConfig = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'local_database',
    connectionLimit: 2,
  },
};

const localConfig = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'local_database',
    connectionLimit: 2,
  },
};

const config = process.env.NODE_ENV ? prodConfig : localConfig;

export default config;
