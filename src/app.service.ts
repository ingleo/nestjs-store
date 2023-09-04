import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TST_API_KEY') private tstApiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('DB_CONN_1') private dbConn: string,
    @Inject(config.KEY) private configServiceType: ConfigType<typeof config>,
    private configService: ConfigService,
  ) {}

  getHello(): string {
    return `Hello Nest App in port ${this.tstApiKey}!`;
  }

  getTodoList(): any[] {
    return this.tasks;
  }

  getDbConn(): string {
    return this.dbConn;
  }

  getAppKey(): string {
    return this.configService.get('APP_KEY');
  }

  getDbInfo(): string {
    const dbName = this.configServiceType.database.name;
    const dbPort = this.configServiceType.database.port;
    return `${dbName} : ${dbPort}`;
  }
}
