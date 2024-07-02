//Nest Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//Controller
import { OrderController } from '../../application/order/controller/order.controller';

//Models
import { Order } from '../database/models/order.model';
import { Transaction } from '../database/models/transaction.model';
import { Food } from '../database/models/food.model';

//Repositories
import { OrderTypeOrmRepository } from '../database/repositories/order.repository';
import { FoodTypeOrmRepository } from '../database/repositories/food.repository';
import { TransactionTypeOrmRepository } from '../database/repositories/transaction.repository';

//External Imports
import { TypeOrmModule } from '@nestjs/typeorm';

//RabbitMq
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

//Use Cases
import { CreateOrderUseCase } from 'src/application/order/usecases/createOrder.usecase';
import { CheckOrderUseCase } from 'src/application/order/usecases/checkOrder.usecase';
import { FindOrdersUseCase } from 'src/application/order/usecases/findOrders.usecase';
import { FindOrderByIdUseCase } from 'src/application/order/usecases/findOrderById.usecase';

@Module({
  controllers: [OrderController],
  exports: [],
  providers: [
    CreateOrderUseCase,
    CheckOrderUseCase,
    FindOrdersUseCase,
    FindOrderByIdUseCase,
    OrderTypeOrmRepository,
    FoodTypeOrmRepository,
    TransactionTypeOrmRepository,
    {
      provide: 'order_repository',
      useExisting: OrderTypeOrmRepository,
    },
    {
      provide: 'food_repository',
      useExisting: FoodTypeOrmRepository,
    },
    {
      provide: 'transaction_repository',
      useExisting: TransactionTypeOrmRepository,
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Order, Transaction, Food]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'order',
          type: 'direct',
        },
        {
          name: 'check-order',
          type: 'direct',
        },
        {
          name: 'fanout-teste',
          type: 'fanout',
        },
      ],
      uri: `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`, // trocar a url quando usar o dockercompose amqp://user:password@rabbitmq:5672
      prefetchCount: 1, // Espera um terminar de salvar para só depois ir para o proximo
    }),
  ],
})
export class OrderModule {}

//amqp://ozne123:password@localhost:5672

//amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}
