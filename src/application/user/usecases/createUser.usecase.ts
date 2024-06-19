//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('user_repository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: any) {
    //usar a entidade

    return await this.userRepository.create(data);
  }
}
