//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

@Injectable()
export class FindOrdersUseCase {
  constructor(
    @Inject('oder_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute() {
    //usar a entidade

    return await this.orderRepository.findAll();
  }
}
