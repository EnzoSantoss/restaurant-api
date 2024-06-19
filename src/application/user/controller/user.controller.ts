//Nest Imports
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

//DTOS
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//Use Cases
import { CreateUserUseCase } from '../usecases/createUser.usecase';
import { FindUserUseCase } from '../usecases/findUsers.usecase';
import { FindUserByIdUseCase } from '../usecases/findUserById.usecase';
import { UpdateUseCase } from '../usecases/updateUser.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUseCase: UpdateUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findUserUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findUserByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUseCase.execute(id, updateUserDto);
  }
}
