//Nest Imports
import { Module } from '@nestjs/common';

//Controller
import { UserController } from '../../application/user/controller/user.controller';

//Module
import { TypeOrmModule } from '@nestjs/typeorm';

//Models
import { User } from '../database/models/user.model';

//Repositories
import { UserTypeOrmRepository } from '../database/repositories/user.repositoy';

//Use Cases
import { CreateUserUseCase } from 'src/application/user/usecases/createUser.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'user_repository',
      useExisting: UserTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
