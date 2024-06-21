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

//RabbitMq
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    FoodModule,
    OrderModule,
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
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'ronaldinho',
          type: 'direct',
        },
        {
          name: 'craque',
          type: 'fanout',
        },
      ],
      uri: 'amqp://ozne123:password@localhost:5672', // trocar a url quando usar o dockercompose amqp://user:password@rabbitmq:5672
      prefetchCount: 1, // Espera um terminar de salvar para só depois ir para o proximo
    }),
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
