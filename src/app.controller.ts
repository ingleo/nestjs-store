import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('todo')
  getTodo(): any[] {
    return this.appService.getTodoList();
  }

  @Get('db')
  getDbConnStr(): string {
    return this.appService.getDbConn();
  }

  @Get('appkey')
  getAppPort(): string {
    return this.appService.getAppKey();
  }

  @Get('dbinfo')
  getDbInfo(): string {
    return this.appService.getDbInfo();
  }
}
