import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { DateAt } from '../../common/entities/date-at.entity';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  phone: string;

  @Column(() => DateAt)
  date: DateAt;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
