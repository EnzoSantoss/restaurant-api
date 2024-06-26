import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { User } from './user.model';
import { Food } from './food.model';
import { Transaction } from './transaction.model';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Food, (food) => food.orders)
  @JoinColumn({ name: 'food_id' })
  food: Food;

  @OneToOne(() => Transaction, (transaction) => transaction.order)
  transaction: Transaction;

  @CreateDateColumn()
  createdAt: Date;
}
