import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenCompanyService } from 'src/token/tokenCompany.service';
import { TAccessCompanyPayload } from 'src/token/types/payload.type';

@Injectable()
export class CompanyAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenCompanyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('invalid token');
    }
    try {
      const payload: TAccessCompanyPayload =
        await this.tokenService.validateAccessToken(token);

      if (!payload) {
        throw new UnauthorizedException('invalid access token');
      }

      request['company'] = payload;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
