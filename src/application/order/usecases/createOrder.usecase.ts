//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

//Testando Rabbit Mq
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  @RabbitSubscribe({
    exchange: 'order',
    routingKey: 'q1',
    queue: 'request', // Nome da sua fila
  })
  async execute(rabbitData: any) {
    //usar a entidade

    try {
      //console.log('SALVANDO NO BANCO');
      const { data } = rabbitData;

      //return await this.orderRepository.create(data);
    } catch (e) {
      //Caso der erro ao ler a mensagem da fila,ela não sera recolado na fila dnv
      //Sem new Nack(false), a mensagem volta para fila
      console.log(e);
      return new Nack(false);
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
