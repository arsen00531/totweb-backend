import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../student/entities/student.entity';
import { ROLES_KEY } from '../../student/decorators/role.decorator';
import { CompanyService } from 'src/company/company.service';
import { TRefreshCompanyPayload } from 'src/token/types/payload.type';

@Injectable()
export class CompanyRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly companyService: CompanyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const companyPayload: TRefreshCompanyPayload = request['company'];

    const company = await this.companyService.findOne(companyPayload.companyId);

    if (!company) {
      throw new UnauthorizedException('wrong role');
    }
    return requiredRoles.some((role) => company.roles.includes(role));
  }
}
