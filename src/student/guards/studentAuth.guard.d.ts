import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenStudentService } from 'src/token/tokenUser.service';
export declare class StudentAuthGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenStudentService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
