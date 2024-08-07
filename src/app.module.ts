//Nest imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//Modules
import { UserModule } from './infrastructure/modules/user.module';
import { FoodModule } from './infrastructure/modules/food.module';
import { OrderModule } from './infrastructure/modules/order.module';

//TypeOrm
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/models/user.model';
import { Food } from './infrastructure/database/models/food.model';
import { Order } from './infrastructure/database/models/order.model';
import { Transaction } from './infrastructure/database/models/transaction.model';

//RabbitMq
//import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

//Redis
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    FoodModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Food, Order, Transaction],
      synchronize: true,
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
        }),
      }),
    }),
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
