//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IFoodRepository } from 'src/domain/repositories/food.repository';

@Injectable()
export class UpdateFoodUseCase {
  constructor(
    @Inject('food_repository') private readonly foodRepository: IFoodRepository,
  ) {}

  async execute(food_id: number, data: any) {
    //usar a entidade

    return await this.foodRepository.update(food_id, data);
  }
}
