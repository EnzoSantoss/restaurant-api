//Nest Imports
import { Module } from '@nestjs/common';

//Controller
import { OrderController } from '../../application/order/controller/order.controller';

//Models
import { Order } from '../database/models/order.model';

//Repositories
import { OrderTypeOrmRepository } from '../database/repositories/order.repository';

//External Imports
import { TypeOrmModule } from '@nestjs/typeorm';

//Use Cases
import { CreateOrderUseCase } from 'src/application/order/usecases/createOrder.usecase';

@Module({
  controllers: [OrderController],
  exports: [],
  providers: [
    CreateOrderUseCase,
    OrderTypeOrmRepository,
    {
      provide: 'oder_repository',
      useExisting: OrderTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
