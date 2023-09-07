import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-product.entity';
import { OrdersService } from './orders.service';
import { ProductsService } from '../../products/services/products.service';
import { Repository } from 'typeorm';
import {
  CreateOrderProductDto,
  UpdateOrderProductDto,
} from '../dtos/order-product.dto';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
    private orderService: OrdersService,
    private productService: ProductsService,
  ) {}

  findAll() {
    return this.orderProductRepo.find({
      relations: {
        order: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    const orderProduct = await this.orderProductRepo.findOne({
      where: { id },
      relations: {
        order: true,
        product: true,
      },
    });

    if (!orderProduct) {
      throw new NotFoundException(`Order product ${id} not found`);
    }
    return orderProduct;
  }

  async create(data: CreateOrderProductDto) {
    const newOrderProduct = this.orderProductRepo.create(data);

    if (data.orderId) {
      const order = await this.orderService.findOne(data.orderId);
      newOrderProduct.order = order;
    }

    if (data.productId) {
      const product = await this.productService.findOne(data.productId);
      newOrderProduct.product = product;
    }

    return await this.orderProductRepo.save(newOrderProduct).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, changes: UpdateOrderProductDto) {
    const orderProduct = await this.findOne(id);

    if (changes.orderId) {
      const order = await this.orderService.findOne(changes.orderId);
      orderProduct.order = order;
    }

    if (changes.productId) {
      const product = await this.productService.findOne(changes.productId);
      orderProduct.product = product;
    }

    this.orderProductRepo.merge(orderProduct, changes);
    return this.orderProductRepo.save(orderProduct);
  }

  async remove(id: number) {
    const orderProduct = await this.findOne(id);
    return this.orderProductRepo.delete(orderProduct);
  }
}
