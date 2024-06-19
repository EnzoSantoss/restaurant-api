//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('user_repository') private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    //usar a entidade

    return await this.userRepository.findAll();
  }
}
