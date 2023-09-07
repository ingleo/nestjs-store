import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrdersProductsService } from '../services/orders-products.service';
import { CreateOrderProductDto } from '../dtos/order-product.dto';

@Controller('orders-products')
export class OrdersProductsController {
  constructor(private ordersProductsService: OrdersProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateOrderProductDto) {
    return this.ordersProductsService.create(payload);
  }
}
