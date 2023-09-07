import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { DateAt } from 'src/common/entities/date-at.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column(() => DateAt)
  date: DateAt;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
