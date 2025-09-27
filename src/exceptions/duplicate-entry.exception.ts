import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes.enum';

export class DuplicateEntryException extends HttpException {
  constructor(message: string = 'Entrada duplicada') {
    super(
      {
        message,
        errorCode: ErrorCode.USERNAME_ALREADY_EXISTS, // or EMAIL_ALREADY_EXISTS, but generic
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}