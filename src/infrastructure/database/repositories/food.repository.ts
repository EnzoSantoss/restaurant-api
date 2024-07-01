//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Models
import { Food } from '../models/food.model';

//Interface

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoodTypeOrmRepository {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
  ) {}

  async create(data: any) {
    console.log(data);
    return await this.foodRepository.save(this.foodRepository.create(data));
  }
  async findAll() {
    return await this.foodRepository.find();
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
