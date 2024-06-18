import { Module } from '@nestjs/common';
import { FoodController } from '../../application/food/controller/food.controller';

@Module({
  controllers: [FoodController],
  providers: [],
})
export class FoodModule {}
