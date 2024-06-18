import { Module } from '@nestjs/common';
import { UserController } from '../../application/user/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/models/user.model';

@Module({
  controllers: [UserController],
  providers: [],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
