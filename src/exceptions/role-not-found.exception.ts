import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes.enum';

export class RoleNotFoundException extends HttpException {
  constructor(message: string = 'Rol no encontrado') {
    super(
      {
        message,
        errorCode: ErrorCode.ROLE_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}