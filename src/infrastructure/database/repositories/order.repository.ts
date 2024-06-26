//Nest Imports
import { Injectable } from '@nestjs/common';

//Models
import { Order } from '../models/order.model';
import { Food } from '../models/food.model';
import { User } from '../models/user.model';

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Connection } from 'mysql2';

type OrdeType = {
  order_id: number;
  quantity: number;
  createdAt: Date;
  food_id: number;
  food_name: string;
  description: string;
  price: number;
  user_id: number;
  user_name: string;
};

@Injectable()
export class OrderTypeOrmRepository {
  constructor(
    @InjectRepository(Order) private OrderRepository: Repository<Order>,
    @InjectDataSource() private readonly connection: Connection,
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

  async findAll() {
    // const orders = await this.queryRawOrders();
    // return orders;

    const orders = await this.OrderRepository.find({
      relations: ['food', 'user'],
    });

    return orders;
  }

  async findById(order_id: number) {
    // const [order] = await this.queryRawOrderById(order_id);
    // return order;

    const order = await this.OrderRepository.findOne({
      where: { order_id },
      relations: ['food', 'user', 'order'],
    });

    return order;
  }

  //- - Query Raw - -
  async queryRawOrders() {
    const order = await this.connection.query(`
      SELECT
      \`order\`.order_id,
      \`order\`.quantity,
      \`order\`.createdAt,
      food.food_id,
      food.name AS food_name,
      food.description,
      food.price,
      user.user_id,
      user.name AS user_name
      FROM \`order\`
      JOIN user
      ON \`order\`.user_id = user.user_id
      JOIN food
      ON \`order\`.food_id = food.food_id
      `);

    return order;
  }

  async queryRawOrderById(order_id: number): Promise<OrdeType[]> {
    const order = await this.connection.query(`
      SELECT
      \`order\`.order_id,
      \`order\`.quantity,
      \`order\`.createdAt,
      food.food_id,
      food.name AS food_name,
      food.description,
      food.price,
      user.user_id,
      user.name AS user_name
      FROM \`order\`
      JOIN user
      ON \`order\`.user_id = user.user_id
      JOIN food
      ON \`order\`.food_id = food.food_id
      WHERE \`order\`.order_id = ${order_id}
      `);

    return order as unknown as OrdeType[];
  }
}
