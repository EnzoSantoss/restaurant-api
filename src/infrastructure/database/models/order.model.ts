import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.model';
import { Food } from './food.model';

@Entity()
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

  @CreateDateColumn()
  createdAt: Date;
}
