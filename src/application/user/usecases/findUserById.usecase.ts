//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject('user_repository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(user_id: number) {
    //usar a entidade

    return await this.userRepository.findById(user_id);
  }
}
