import { Module } from '@nestjs/common';

import { OrderController } from '../../application/order/controller/order.controller';

@Module({
  controllers: [OrderController],
  imports: [],
  exports: [],
})
export class OrderModule {}
