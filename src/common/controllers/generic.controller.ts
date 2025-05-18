import { HttpCode, HttpStatus } from '@nestjs/common';
import { GenericApiResponse } from '../dtos/common.dto';

export abstract class GenericController {
  genericResponse(
    statusCode: HttpStatus = HttpStatus.OK,
    message: string = 'success',
  ): GenericApiResponse {
    return {
      statusCode,
      message,
    };
  }

  responseBadRequest(message: string): GenericApiResponse {
    return {
      error: true,
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    };
  }
}
