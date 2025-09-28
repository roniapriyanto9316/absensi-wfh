import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'get-user-by-email' }, email),
      );

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: _pwd, ...result } = user;
      return result;
    } catch (err) {
      throw new UnauthorizedException(err.message || 'Invalid credentials');
    }
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
}
