import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController],
})
export class UsersModule {}
