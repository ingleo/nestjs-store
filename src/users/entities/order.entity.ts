import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { OrderProduct } from './order-product.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderproducts: OrderProduct[];

  @Expose()
  get products() {
    if (this.orderproducts) {
      return this.orderproducts
        .filter((item) => !!item)
        .map((item) => {
          delete item.product.createdAt;
          delete item.product.updatedAt;
          return {
            ...item.product,
            quantity: item.quantity,
          };
        });
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.orderproducts) {
      return this.orderproducts
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
