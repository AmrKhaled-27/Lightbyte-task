import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { Request } from 'express';
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const payload = this.authService.verifyToken(token);

        if (!payload) {
            return false;
        }

        request.user = payload;
        return true;
    }

    private extractTokenFromHeader(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
