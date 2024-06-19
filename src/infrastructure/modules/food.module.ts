//Nest Imports
import { Module } from '@nestjs/common';

//Controllers
import { FoodController } from '../../application/food/controller/food.controller';

//Models
import { Food } from '../database/models/food.model';

//Repositories
import { FoodTypeOrmRepository } from '../database/repositories/food.repository';

//External Imports
import { TypeOrmModule } from '@nestjs/typeorm';

//Use Cases
import { CreateFoodUseCase } from 'src/application/food/usecases/createFood.usecase';

@Module({
  controllers: [FoodController],
  providers: [
    CreateFoodUseCase,
    FoodTypeOrmRepository,
    {
      provide: 'food_repository',
      useExisting: FoodTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Food])],
})
export class FoodModule {}
