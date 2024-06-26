//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IOrderRepository } from 'src/domain/repositories/order.repository';
import { IFoodRepository } from 'src/domain/repositories/food.repository';

//Testando Rabbit Mq
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

//Entity
import { FoodEntity } from 'src/domain/entities/food.entity';

@Injectable()
export class CheckOrderUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,

    @Inject('food_repository')
    private readonly foodRepository: IFoodRepository,
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
      console.log('VERIFICANDO DISPONIBILIDADE');
      const { data } = rabbitData;

      const dbReturn = await this.foodRepository.findById(data.food_id);

      const food = new FoodEntity(
        dbReturn.name,
        dbReturn.description,
        dbReturn.price,
      );

      food.setFoodId(dbReturn.food_id);
      food.setStock(dbReturn.stock_qtd);

      console.log(data);
      console.log(food);
    } catch (e) {
      //Caso der erro ao ler a mensagem da fila,ela não sera recolado na fila dnv
      //Sem new Nack(false), a mensagem volta para fila
      //new Nack(false);
    }

    return;
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
