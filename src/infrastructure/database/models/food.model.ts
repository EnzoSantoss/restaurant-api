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

  @Column({ type: 'int', default: 10 })
  stock_qtd: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.food)
  orders: Order[];
}
