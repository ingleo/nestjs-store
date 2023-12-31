import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { ProductsModule } from '../products/products.module';
import { OrdersProductsController } from './controllers/orders-products.controller';
import { OrdersProductsService } from './services/orders-products.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Order, OrderProduct]),
    ProductsModule,
  ],
  providers: [
    UsersService,
    CustomersService,
    OrdersService,
    OrdersProductsService,
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrdersProductsController,
    ProfileController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
