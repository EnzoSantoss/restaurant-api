//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Redis
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export interface IFoodCache {
  findAllFoods(): any;
  setFood(data: any, key: string, ttl: number): Promise<void>;
}

@Injectable()
export class FoodCacheRedis implements IFoodCache {
  constructor(@Inject(CACHE_MANAGER) private cacheManger: Cache) {}

  async findAllFoods() {
    const allFoodCacheKey = 'all_food';

    const foods = await this.cacheManger.get(allFoodCacheKey);

    if (!foods) {
      return null;
    }

    console.log('BUSCANDO DO CACHE!!!');
    return foods;
  }

  async setFood(data: any, key: string, ttl: number): Promise<void> {
    console.log('SALVANDO NO CACHE AS NOVAS INFOS');
    await this.cacheManger.set(key, data, ttl);
  }
}
