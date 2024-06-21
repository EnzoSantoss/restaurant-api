//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

//Testando Rabbit Mq
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class FindOrdersUseCase {
  constructor(
    @Inject('oder_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  @RabbitSubscribe({
    exchange: 'ronaldinho',
    routingKey: 'tipo1',
    queue: 'voNada', // Nome da sua fila
  })
  async execute(message?: any) {
    //usar a entidade
    console.log(message);

    await this.wait(4000);

    //return await this.orderRepository.findAll();
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
