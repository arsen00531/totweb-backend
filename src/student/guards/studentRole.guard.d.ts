import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StudentService } from '../student.service';
export declare class StudentRoleGuard implements CanActivate {
    private reflector;
    private readonly StudentService;
    constructor(reflector: Reflector, StudentService: StudentService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
