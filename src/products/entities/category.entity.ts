import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
