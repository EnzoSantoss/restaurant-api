//Nest Imports
import { Module } from '@nestjs/common';

//Controllers
import { FoodController } from '../../application/food/controller/food.controller';

//Models
import { Food } from '../database/models/food.model';

//Repositories
import { FoodTypeOrmRepository } from '../database/repositories/food.repository';

//Cache
import { FoodCacheRedis } from '../cache/food.cache';

//Proxy
import { FoodProxy } from '../proxy/food.proxy';

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
    FoodCacheRedis,
    FoodProxy,
    {
      provide: 'food_repository',
      useExisting: FoodTypeOrmRepository,
    },
    {
      provide: 'food_cache',
      useExisting: FoodCacheRedis,
    },
    {
      provide: 'food_proxy',
      useExisting: FoodProxy,
    },
  ],
  imports: [TypeOrmModule.forFeature([Food])],
})
export class FoodModule {}
