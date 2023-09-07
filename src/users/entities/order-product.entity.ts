import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DateAt } from '../../common/entities/date-at.entity';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderproducts)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column(() => DateAt)
  date: DateAt;
}
