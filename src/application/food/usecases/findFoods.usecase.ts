//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IFoodRepository } from 'src/domain/repositories/food.repository';
import { IFoodProxy } from 'src/infrastructure/proxy/food.proxy';

@Injectable()
export class FindFoodUseCase {
  constructor(
    //@Inject('food_repository') private readonly foodRepository: IFoodRepository,
    @Inject('food_proxy') private readonly foodRepository: IFoodProxy,
  ) {}

  async execute() {
    //usar a entidade

    return await this.foodRepository.findAll();
  }
}
