import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('TST_API_KEY') private tstApiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    return `Hello Nest App in port ${this.tstApiKey}!`;
  }

  getTodoList(): any[] {
    return this.tasks;
  }
}
