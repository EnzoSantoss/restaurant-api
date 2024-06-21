//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

//Entity
import { UserEntity } from 'src/domain/entities/user.entity';

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
