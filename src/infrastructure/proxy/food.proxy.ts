//Nest imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IFoodRepository } from 'src/domain/repositories/food.repository';
import { IFoodCache } from '../cache/food.cache';

export interface IFoodProxy {
  findAll();
}

@Injectable()
export class FoodProxy {
  constructor(
    @Inject('food_repository') private readonly foodRepository: IFoodRepository,
    @Inject('food_cache') private readonly foodCache: IFoodCache,
  ) {}

  async findAll() {
    const cacheFood = await this.foodCache.findAllFoods();

    //Retornando cache
    if (cacheFood) {
      return cacheFood;
    }

    //Salvando retorno do banco no cache
    const foods = await this.foodRepository.findAll();
    await this.foodCache.setFood(foods, 'all_food', 10000);

    return foods;
  }
}
