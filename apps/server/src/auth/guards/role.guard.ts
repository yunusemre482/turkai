import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomAuthGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '@prisma/client';



@Injectable()
export class RolesGuard extends CustomAuthGuard implements CanActivate {
  constructor(
    reflector: Reflector,
    private readonly _authService: AuthService,
  ) {
    super(reflector, _authService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtVerified = await super.canActivate(context);
    if (!jwtVerified) return false;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) as Role[];

    const request = context.switchToHttp().getRequest();


    try {
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.userId;

      const user = await this._authService.getProfile(userId);

      if (!user) {
        throw new UnauthorizedException("Invalid access token");
      }

      return this.validateRoles(user.roles, requiredRoles);

    } catch {
      throw new UnauthorizedException("Invalid access token");
    }
  }


  private validateRoles(roles: Role[], userRoles: Role[]): boolean {
    return userRoles.some((role) => roles.includes(role));
  }
}
