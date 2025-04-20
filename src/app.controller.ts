import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: `Hello World ${this.configService.get<string>('MONGODB_URI')}`,
      date: new Date().toLocaleString()
    };
  }

  @Get('hello')
  sayHello(): string {
    return 'Xin chào! Đây là ứng dụng NestJS đầu tiên của bạn!';
  }

  @Get('ping')
  ping(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString()
    };
  }
}


