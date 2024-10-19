/* eslint-disable security/detect-object-injection */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { getError, getStack } from 'src/core/utils';

export interface GlobalExceptionFilterOptions {
  includeSensitive?: boolean;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly includeSensitive: boolean;

  constructor(options?: GlobalExceptionFilterOptions) {
    this.includeSensitive = options && options.includeSensitive;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<any>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.err = exception;

      const { errorId, message, error } = exception.getResponse() as {
        errorId: unknown;
        message: unknown;
        error: unknown;
      };

      return response.status(status).json({
        success: false,
        code: status,
        message,
        error,
        path: request.url,
        timestamp: new Date().getTime(),
        errorId: errorId ?? HttpStatus[status],
        stack: this.includeSensitive ? getStack(exception) : undefined,
      });
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const error = getError(exception);
    response.err = error;

    return response.status(status).json({
      success: false,
      code: status,
      errorId: HttpStatus[status],
      message: 'Internal server error',
      path: request.url,
      error: error.message,
      timestamp: new Date().getTime(),
      stack: this.includeSensitive ? getStack(error) : undefined,
    });
  }
}
