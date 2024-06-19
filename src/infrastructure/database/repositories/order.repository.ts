//Nest Imports
import { Injectable } from '@nestjs/common';

//Models
import { Order } from '../models/order.model';
import { Food } from '../models/food.model';
import { User } from '../models/user.model';

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderTypeOrmRepository {
  constructor(
    @InjectRepository(Order) private OrderRepository: Repository<Order>,
  ) {}

  async create(data: any) {
    console.log(data);

    const newOrder = new Order();

    newOrder.quantity = data?.quantity;
    //Alternativa para não precisar criar uma instanci da entidade
    newOrder.user = { user_id: data?.user_id } as User;
    newOrder.food = { food_id: data?.food_id } as Food;

    return await this.OrderRepository.save(newOrder);
  }
  //   findAll() {}
  //   findById(user_id: number) {}
  //   update(data: any) {}
}
