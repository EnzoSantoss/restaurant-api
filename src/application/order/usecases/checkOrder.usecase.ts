//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';

//Testando Rabbit Mq
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class CheckOrderUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  //   @RabbitSubscribe({
  //     exchange: 'check-order',
  //     routingKey: 'q2',
  //     queue: 'check-request', // Nome da sua fila
  //   })

  //   @RabbitSubscribe({
  //     exchange: 'fanout-teste',
  //     queue: 'request', // Nome da sua fila
  //   })

  @RabbitSubscribe({
    exchange: 'check-order',
    routingKey: 'q2',
    queue: 'check-request', // Nome da sua fila
  })
  async execute(rabbitData: any) {
    //usar a entidade

    try {
      const { data } = rabbitData;

      console.log('VERIFICANDO DISPONIBILIDADE');
      console.log(data);
      await this.wait(10000);
      console.log('DONE');
    } catch (e) {
      //Caso der erro ao ler a mensagem da fila,ela não sera recolado na fila dnv
      //Sem new Nack(true), a mensagem volta para fila
      new Nack(true);
    }

    return;
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
