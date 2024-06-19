//Nest Imports
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

//Dtos
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

//Use Cases
import { CreateFoodUseCase } from '../usecases/createFood.usecase';
import { FindFoodUseCase } from '../usecases/findFoods.usecase';
import { FindFoodByIdUseCase } from '../usecases/findFoodById.usecase';
import { UpdateFoodUseCase } from '../usecases/updateFood.usecase';

@Controller('food')
export class FoodController {
  constructor(
    private readonly createFoodUseCase: CreateFoodUseCase,
    private readonly findFoodUseCase: FindFoodUseCase,
    private readonly findFoodByIdUseCase: FindFoodByIdUseCase,
    private readonly updateFoodUseCase: UpdateFoodUseCase,
  ) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.createFoodUseCase.execute(createFoodDto);
  }

  @Get()
  findAll() {
    return this.findFoodUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findFoodByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFoodDto: UpdateFoodDto) {
    return this.updateFoodUseCase.execute(id, updateFoodDto);
  }
}
