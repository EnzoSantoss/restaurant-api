//Nest Imports
import { Injectable } from '@nestjs/common';

//Models
import { Transaction } from '../models/transaction.model';
import { Order } from '../models/order.model';

//Interface
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionTypeOrmRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: any) {
    const order = new Order();
    order.order_id = data.order_id;

    const transaction = this.transactionRepository.create({
      ...data,
      order,
    });

    return this.transactionRepository.save(transaction);

    // return await this.transactionRepository.save(
    //   this.transactionRepository.create(data),
    // );
  }
  //   async findAll() {
  //     return await this.foodRepository.find();
  //   }
  //   async findById(food_id: number) {
  //     return await this.foodRepository.findOne({
  //       where: {
  //         food_id,
  //       },
  //     });
  //   }
  //   async update(food_id: number, data: any) {
  //     await this.foodRepository.update(food_id, data);

  //     return await this.foodRepository.findOne({
  //       where: {
  //         food_id,
  //       },
  //     });
  //   }
}
