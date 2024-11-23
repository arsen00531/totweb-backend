import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../entities/student.entity';
import { ROLES_KEY } from '../decorators/role.decorator';
import { StudentService } from '../student.service';
import { TRefreshStudentPayload } from 'src/token/types/payload.type';

@Injectable()
export class StudentRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly StudentService: StudentService,
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
    const userPayload: TRefreshStudentPayload = request['user'];

    const user = await this.StudentService.findOne(userPayload.studentId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
