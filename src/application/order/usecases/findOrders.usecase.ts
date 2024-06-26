//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

@Injectable()
export class FindOrdersUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(message?: any) {
    //usar a entidade

    return await this.orderRepository.findAll();
  }
}
