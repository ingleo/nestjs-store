import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';

@Module({
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController],
})
export class UsersModule {}
