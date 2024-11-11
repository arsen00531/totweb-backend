import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenStudentService } from 'src/token/tokenUser.service';
import { TAccessUserPayload } from 'src/token/types/payload.type';

@Injectable()
export class StudentAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenStudentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: TAccessUserPayload =
        await this.tokenService.validateAccessToken(token);

      if (!payload) {
        throw new UnauthorizedException('invalid access token');
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
