//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(data: any) {
    //usar a entidade

    return await this.orderRepository.findById(data);
  }
}
