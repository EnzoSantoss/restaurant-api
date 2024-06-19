//Nest Imports
import { Injectable } from '@nestjs/common';

//Models
import { User } from '../models/user.model';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Connection } from 'mysql2';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectDataSource() private readonly connection: Connection,
  ) {}

  async create(data: any) {
    console.log(data);
    return await this.userRepository.save(this.userRepository.create(data));
  }
  async findAll() {
    return await this.userRepository.find();
  }
  async findById(user_id: number) {
    // return await this.userRepository.findOne({
    //   where: {
    //     user_id,
    //   },
    //   relations: ['orders'],
    // });

    const [userQuery] = await this.queryRawUserById(user_id);

    const foodQuery = await this.queryRawUserOrders(user_id);

    const user = {
      ...userQuery,
      orders: foodQuery,
    };

    return user;
  }
  async update(user_id: number, data: any) {
    await this.userRepository.update(user_id, data);

    return await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
  }

  //- - Query Raw - -
  private async queryRawUserById(user_id: number) {
    const user = await this.connection.query(`
      SELECT *
      FROM user
      WHERE user.user_id = ${user_id}
      `);

    //Tentando tipar o retorno da função
    return user as unknown as { user_id: number; name: string }[];
  }

  private async queryRawUserOrders(user_id: number) {
    //Order é uma palavra reservada no mysql, então é necessario colocar esse \'\' na palavra
    const data = await this.connection.query(`
      SELECT 
      order_id
      quantity
      createdAt
      FROM \`order\`
      JOIN food
      ON \`order\`.food_id = food.food_id
      WHERE \`order\`.user_id = ${user_id}
      `);
    return data as unknown as {
      order_id: number;
      quantity: number;
      createdAt: Date;
      food_id: number;
      name: string;
      description: string;
      price: number;
    }[];
  }
}
