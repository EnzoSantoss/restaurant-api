//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IFoodRepository } from 'src/domain/repositories/food.repository';

@Injectable()
export class FindFoodUseCase {
  constructor(
    @Inject('food_repository') private readonly foodRepository: IFoodRepository,
  ) {}

  async execute() {
    //usar a entidade

    return await this.foodRepository.findAll();
  }
}
