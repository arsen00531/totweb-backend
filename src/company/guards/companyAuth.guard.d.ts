import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenCompanyService } from 'src/token/tokenCompany.service';
export declare class CompanyAuthGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenCompanyService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
