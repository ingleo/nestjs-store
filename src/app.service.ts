import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TST_API_KEY') private tstApiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configServiceType: ConfigType<typeof config>,
    private configService: ConfigService,
    @Inject('PG') private pgClient: Client,
  ) {}

  getHello(): string {
    return `Hello Nest App in port ${this.tstApiKey}!`;
  }

  getTodoList(): any[] {
    return this.tasks;
  }

  getAppKey(): string {
    return this.configService.get('APP_KEY');
  }

  getDbInfo(): string {
    const dbName = this.configServiceType.database.name;
    const dbPort = this.configServiceType.database.port;
    return `${dbName} : ${dbPort}`;
  }

  getTestTableInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pgClient.query('SELECT * FROM public.test', (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res.rows);
      });
    });
  }
}
