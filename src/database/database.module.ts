import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONN_1',
      useValue:
        process.env.NODE_ENV === 'dev'
          ? 'http://devdatabase.conn'
          : 'http://database.conn',
    },
  ],
  exports: ['DB_CONN_1'],
})
export class DatabaseModule {}
