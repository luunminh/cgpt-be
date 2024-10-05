import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    const { message, ...data } = errorResponse as any;

    if (status === 400) {
      return response.status(status).json({
        code: status,
        success: false,
        errorId: 'BAD_REQUEST',
        message: message || 'Bad Request',
        data,
      });
    } else {
      return response.status(status).json({
        code: status,
        message: message || 'Internal Server Error',
      });
    }
  }
}
