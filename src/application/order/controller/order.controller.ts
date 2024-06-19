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
import { FindOrdersUseCase } from '../usecases/findOrders.usecase';
import { FindOrderByIdUseCase } from '../usecases/findOrderById.usecase';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findOrdersUseCase: FindOrdersUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
  ) {}

  @Post()
  create(@Body() createOrderDto: any) {
    return this.createOrderUseCase.execute(createOrderDto);
  }

  @Get()
  getAll() {
    return this.findOrdersUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.findOrderByIdUseCase.execute(id);
  }
}
