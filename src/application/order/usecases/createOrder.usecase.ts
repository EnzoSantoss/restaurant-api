//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

//Testando Rabbit Mq
import {
  Nack,
  RabbitSubscribe,
  AmqpConnection,
} from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    exchange: 'order',
    routingKey: 'q1',
    queue: 'request',
  })
  async execute(rabbitData: any) {
    try {
      const { data } = rabbitData;
      console.log('SALVANDO NO BANCO');

      //Salvando no bando
      const order = await this.orderRepository.create(data);

      //Direcionando para fila de transaction
      this.amqpConnection.publish('check-order', 'q2', {
        ...order,
      });
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
