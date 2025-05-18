import { HttpStatus } from '@nestjs/common';

export interface GenericApiResponse {
  error?: boolean;
  message: string | string[];
  statusCode: HttpStatus;
}
