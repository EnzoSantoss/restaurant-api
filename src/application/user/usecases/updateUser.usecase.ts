//Nest Imports
import { Inject, Injectable } from '@nestjs/common';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UpdateUseCase {
  constructor(
    @Inject('user_repository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(user_id: number, data: any) {
    //usar a entidade

    return await this.userRepository.update(user_id, data);
  }
}
