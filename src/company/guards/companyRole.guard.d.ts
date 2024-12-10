import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyService } from 'src/company/company.service';
export declare class CompanyRoleGuard implements CanActivate {
    private reflector;
    private readonly companyService;
    constructor(reflector: Reflector, companyService: CompanyService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
