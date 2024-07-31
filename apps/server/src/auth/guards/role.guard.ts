import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomAuthGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '@prisma/client';


@Injectable()
export class RolesGuard extends CustomAuthGuard implements CanActivate {

  readonly logger = new Logger(RolesGuard.name);

  constructor(
    reflector: Reflector,
    private readonly _authService: AuthService
  ) {
    super(reflector, _authService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtVerified = await super.canActivate(context);
    if (!jwtVerified) return false;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) as Role[];

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    const user = await this._authService.getProfile(userId);

    this.logger.debug(`User: ${JSON.stringify(user)}`);


    if (!user) {
      throw new UnauthorizedException('User not found with the provided token');
    }

    if (user && !user.roles) {
      throw new UnauthorizedException('User not found with the provided roles');
    }

    const isValidated = this.validateRoles(user.roles, requiredRoles);

    this.logger.debug(`Required Roles: ${requiredRoles}`);
    this.logger.debug(`isValidated: ${isValidated}`);

    if (!isValidated) {
      throw new UnauthorizedException('You are not authorized to access this resource , please contact your administrator');
    }

    this.logger.debug(`User is authorized to access this resource`);

    return true;


  }


  private validateRoles(roles: Role[] | undefined, userRoles: Role[]): boolean {

    if (!roles) return false;

    return userRoles.some((role) => roles.includes(role));
  }
}
