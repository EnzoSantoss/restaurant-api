//Nest Imports
import { Injectable, Inject } from '@nestjs/common';

//Models
import { User } from '../models/user.model';

//Interface
import { IUserRepository } from 'src/domain/repositories/user.repository';

//External Libs
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(data: any) {
    console.log(data);
    //return await this.userRepository.save(this.userRepository.create(data));
  }
  findAll() {}
  findById(user_id: number) {}
  update(data: any) {}
}
