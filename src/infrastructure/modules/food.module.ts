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
import { FindFoodUseCase } from 'src/application/food/usecases/findFoods.usecase';
import { FindFoodByIdUseCase } from 'src/application/food/usecases/findFoodById.usecase';
import { UpdateFoodUseCase } from 'src/application/food/usecases/updateFood.usecase';

@Module({
  controllers: [FoodController],
  providers: [
    CreateFoodUseCase,
    FindFoodUseCase,
    FindFoodByIdUseCase,
    UpdateFoodUseCase,
    FoodTypeOrmRepository,
    {
      provide: 'food_repository',
      useExisting: FoodTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([Food])],
})
export class FoodModule {}
