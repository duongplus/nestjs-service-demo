import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Để chạy các test case trong file này:
 * 
 * 1. Chạy tất cả các test:
 *    npm run test
 *    
 * 2. Chạy test cho file này:
 *    npm run test app.controller.spec.ts
 *    
 * 3. Chạy test ở chế độ watch:
 *    npm run test:watch
 *    
 * 4. Chạy test với coverage:
 *    npm run test:cov
 */

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('hello', () => {
    it('should return "Xin chào! Đây là ứng dụng NestJS đầu tiên của bạn!"', () => {
      expect(appController.sayHello()).toBe('Xin chào! Đây là ứng dụng NestJS đầu tiên của bạn!');
    });
  });

  describe('ping', () => {
    it('should return { status: "OK", timestamp: string }', () => {
      const result = appController.ping();
      expect(result).toEqual({ status: 'OK', timestamp: expect.any(String) });
    });
  });
});
