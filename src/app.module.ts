import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TST_API_KEY',
      useValue: (process.env.NODE_ENV = 'dev' ? '1234567890' : '0987654321'),
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const response = await lastValueFrom(request);
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
