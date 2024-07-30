import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '@app/users/users.module';
import { CompaniesModule } from '@app/companies/companies.module';
import { EmployeesModule } from '@app/employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalResponseInterceptor } from '@app/infrastructure/middlewares/global-response.handler';
import { GlobalExceptionFilter } from '@app/infrastructure/middlewares/global-error.handler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AuthModule, UsersModule, CompaniesModule, EmployeesModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production', '.env.test', '.env.local.development', '.env.local.production', '.env.local.test'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'assets'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe.bind(null, {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
})
export class AppModule { }
