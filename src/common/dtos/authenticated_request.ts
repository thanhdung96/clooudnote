import { Request } from 'express';
import { JwtPayload } from 'src/securities/dtos/jwt_payload.dto';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
