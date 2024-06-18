//Nest imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//Modules
import { UserModule } from './application/user/user.module';
import { FoodModule } from './application/food/food.module';

//Type Orm
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/type_orm/user.model';

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
      entities: [User],
      synchronize: true,
    }),
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
