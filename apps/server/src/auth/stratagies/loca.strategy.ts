import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('email', email);
        console.log('password', password);


        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid user credentials');
        }
        return user;
    }
}