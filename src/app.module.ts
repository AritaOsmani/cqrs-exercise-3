import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  MongooseModule.forRootAsync({
    imports: [],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get('DB_WRITE_URI'),

      }
    },
    connectionName: 'writeDB'
  }
  ),
  MongooseModule.forRootAsync({
    imports: [],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get('DB_READ_URI')
      }
    },
    connectionName: 'readDB'
  }),
    CqrsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
