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

//Use Cases
import { CreateOrderUseCase } from '../usecases/createOrder.usecase';

@Controller('order')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  create(@Body() createOrderDto: any) {
    return this.createOrderUseCase.execute(createOrderDto);
  }
}
