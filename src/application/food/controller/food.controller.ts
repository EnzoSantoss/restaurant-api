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

@Controller('food')
export class FoodController {
  constructor(private readonly createFoodUseCase: CreateFoodUseCase) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.createFoodUseCase.execute(createFoodDto);
  }

  // @Get()
  // findAll() {}

  // @Get(':id')
  // findOne(@Param('id') id: string) {}

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {}

  // @Delete(':id')
  // remove(@Param('id') id: string) {}
}
