import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
    },
    appkey: process.env.APP_KEY,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiration: process.env.JWT_EXPIRATION,
    },
  };
});
