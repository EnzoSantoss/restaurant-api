//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface and types
import { IOrderRepository } from 'src/domain/repositories/order.repository';
import { IFoodRepository } from 'src/domain/repositories/food.repository';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';
import { CheckOrderType } from 'src/domain/entities/food.entity';

//Testando Rabbit Mq
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

//Entity
import { FoodEntity } from 'src/domain/entities/food.entity';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';

@Injectable()
export class CheckOrderUseCase {
  constructor(
    @Inject('order_repository')
    private readonly orderRepository: IOrderRepository,

    @Inject('food_repository')
    private readonly foodRepository: IFoodRepository,

    @Inject('transaction_repository')
    private readonly transactionRepository: ITransactionRepository,
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
    try {
      console.log('GERANDO TRANSAÇÃO');
      const { food, quantity, order_id } = rabbitData;

      const dbReturn = await this.foodRepository.findById(food.food_id);

      const orderFood = new FoodEntity(
        dbReturn.name,
        dbReturn.description,
        dbReturn.price,
      );

      orderFood.setFoodId(dbReturn.food_id);
      orderFood.setStock(dbReturn.stock_qtd);

      const checkOrder = orderFood.checkOrder(quantity);

      await this.wait(5000);

      if (checkOrder.isAvailable) {
        await this.upadateFoodStock(
          orderFood.getFoodId(),
          orderFood.getStock(),
        );
        await this.createTransaction(orderFood, checkOrder, order_id);
      } else {
        await this.createTransaction(orderFood, checkOrder, order_id);
      }
    } catch (e) {
      //Caso der erro ao ler a mensagem da fila,ela não sera recolado na fila dnv
      //Sem new Nack(false), a mensagem volta para fila
      console.log(e);
      new Nack(false);
    }

    return;
  }

  private async upadateFoodStock(food_id: number, currentStock: number) {
    await this.foodRepository.update(food_id, { stock_qtd: currentStock });
  }

  private async createTransaction(
    food: FoodEntity,
    order: CheckOrderType,
    order_id: number,
  ) {
    const transaction = new TransactionEntity(order_id);

    if (order.isAvailable) {
      transaction.setStatus('ok');
      transaction.setDescription(
        `order amount: ${order.quantity}, product: ${food.getName()} `,
      );
    } else {
      transaction.setStatus('stock_unavailable');
      transaction.setDescription(
        `order amount: ${
          order.quantity
        } product: ${food.getName()} - incomplete due to product out of stock`,
      );
    }

    transaction.setValue(order.totalPrice);

    await this.transactionRepository.create({
      status: transaction.getStatus(),
      value: transaction.getValue(),
      description: transaction.getDescription(),
      order_id: transaction.getOrderId(),
    });
  }

  //private sendEmail() {}

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
