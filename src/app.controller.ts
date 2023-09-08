import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('Test endpoints')
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
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
