//Nest Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Controller
import { UserController } from '../../application/user/controller/user.controller';

//Models
import { User } from '../database/models/user.model';

//Repositories
import { UserTypeOrmRepository } from '../database/repositories/user.repository';

//Use Cases
import { CreateUserUseCase } from 'src/application/user/usecases/createUser.usecase';
import { FindUserUseCase } from 'src/application/user/usecases/findUsers.usecase';
import { FindUserByIdUseCase } from 'src/application/user/usecases/findUserById.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByIdUseCase,
    UserTypeOrmRepository,
    {
      provide: 'user_repository',
      useExisting: UserTypeOrmRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
