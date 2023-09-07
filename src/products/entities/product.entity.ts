import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { DateAt } from '../../common/entities/date-at.entity';
import { Brand } from './brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column(() => DateAt)
  date: DateAt;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
