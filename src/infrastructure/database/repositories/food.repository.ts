//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Models
import { Food } from '../models/food.model';

//Interface

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//Redis
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FoodTypeOrmRepository {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
  ) {}

  async create(data: any) {
    console.log(data);
    return await this.foodRepository.save(this.foodRepository.create(data));
  }
  async findAll() {
    const allFoodCacheKey = 'all_food';

    //Buscando no cache todas as foods
    const allFoodsCache = await this.cacheManger.get(allFoodCacheKey);

    //Retornando do cache caso existir
    if (allFoodsCache) {
      return {
        FROM_CACHE: 'from cache',
        allFoodsCache,
      };
    }

    //Retornando do banco de não existir no cache
    const allFoods = await this.foodRepository.find();
    await this.cacheManger.set(allFoodCacheKey, allFoods, 10000);

    return {
      NOT_FROM_CACHE: 'teste',
      allFoods,
    };
    //return await this.foodRepository.find();
  }
  async findById(food_id: number) {
    return await this.foodRepository.findOne({
      where: {
        food_id,
      },
    });
  }
  async update(food_id: number, data: any) {
    await this.foodRepository.update(food_id, data);

    return await this.foodRepository.findOne({
      where: {
        food_id,
      },
    });
  }
}
