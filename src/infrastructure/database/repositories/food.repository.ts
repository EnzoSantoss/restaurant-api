//Nest Imports
import { Injectable } from '@nestjs/common';

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
  //   findAll() {}
  //   findById(user_id: number) {}
  //   update(data: any) {}
}
