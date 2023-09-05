import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Test endpoints')
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

  @Get('appkey')
  getAppPort(): string {
    return this.appService.getAppKey();
  }

  @Get('dbinfo')
  getDbInfo(): string {
    return this.appService.getDbInfo();
  }

  @Get('testdb')
  getTestTableInfo(): Promise<any> {
    return this.appService.getTestTableInfo();
  }
}
