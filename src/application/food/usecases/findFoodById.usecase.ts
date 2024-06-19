//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IFoodRepository } from 'src/domain/repositories/food.repository';

@Injectable()
export class FindFoodByIdUseCase {
  constructor(
    @Inject('food_repository') private readonly foodRepository: IFoodRepository,
  ) {}

  async execute(data: any) {
    //usar a entidade

    return await this.foodRepository.findById(data);
  }
}
