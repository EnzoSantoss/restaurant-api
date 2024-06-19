//Nest imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//Modules
import { UserModule } from './infrastructure/modules/user.module';
import { FoodModule } from './infrastructure/modules/food.module';

//TypeOrm
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/models/user.model';
import { Food } from './infrastructure/database/models/food.model';
import { Order } from './infrastructure/database/models/order.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    FoodModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3307,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Food, Order],
      synchronize: true,
    }),
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
