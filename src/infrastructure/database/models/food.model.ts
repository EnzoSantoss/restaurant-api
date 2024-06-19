import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Order } from './order.model';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  food_id: number;

  @Column()
  name: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'double' })
  price: number;

  @OneToMany(() => Order, (order) => order.food)
  orders: Order[];
}
