import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (status === 400 && Array.isArray(exceptionResponse['message'])) {
      const messages = exceptionResponse['message'];
      const customResponse = {
        error_code: this.getErrorCode(messages[0]),
        message: this.getCustomMessage(messages[0]),
        field: this.getFieldName(messages[0]),
        statusCode: status
      };
      return response.status(status).json(customResponse);
    }

    return response.status(status).json(exceptionResponse);
  }

  private getErrorCode(message: string): string {
    if (message.includes('email must be an email')) return '40001';
    if (message.includes('email should not be empty')) return '40002';
    if (message.includes('password should not be empty')) return '40003';
    if (message.includes('password must be longer than or equal to 6 characters')) return '40004';
    if (message.includes('name should not be empty')) return '40005';
    return '40000';
  }

  private getCustomMessage(message: string): string {
    if (message.includes('email must be an email')) return 'Email không đúng định dạng';
    if (message.includes('email should not be empty')) return 'Email không được để trống';
    if (message.includes('password should not be empty')) return 'Mật khẩu không được để trống';
    if (message.includes('password must be longer than or equal to 6 characters')) return 'Mật khẩu phải có ít nhất 6 ký tự';
    if (message.includes('name should not be empty')) return 'Tên không được để trống';
    return message;
  }

  private getFieldName(message: string): string {
    if (message.includes('email')) return 'email';
    if (message.includes('password')) return 'password';
    if (message.includes('name')) return 'name';
    return 'unknown';
  }
} 