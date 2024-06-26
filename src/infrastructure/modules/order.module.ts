//Nest Imports
import { Module } from '@nestjs/common';

//Controller
import { OrderController } from '../../application/order/controller/order.controller';

//Models
import { Order } from '../database/models/order.model';
import { Transaction } from '../database/models/transaction.model';
import { Food } from '../database/models/food.model';

//Repositories
import { OrderTypeOrmRepository } from '../database/repositories/order.repository';
import { FoodTypeOrmRepository } from '../database/repositories/food.repository';
//External Imports
import { TypeOrmModule } from '@nestjs/typeorm';

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
    {
      provide: 'order_repository',
      useExisting: OrderTypeOrmRepository,
    },
    {
      provide: 'food_repository',
      useExisting: FoodTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Order, Transaction, Food])],
})
export class OrderModule {}
