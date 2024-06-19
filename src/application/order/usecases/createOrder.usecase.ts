//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('oder_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(data: any) {
    //usar a entidade

    return await this.orderRepository.create(data);
  }
}
