import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DateAt } from '../../common/entities/date-at.entity';
import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column(() => DateAt)
  date: DateAt;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
