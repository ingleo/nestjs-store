import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { TokenPayload } from '../models/token-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const passwdMatch = await bcrypt.compare(password, user.password);

    if (user && passwdMatch) {
      return user;
    }

    return null;
  }

  generateJwt(user: User) {
    const payload: TokenPayload = { role: user.role, sub: user.id };
    return { access_token: this.jwtService.sign(payload), user };
  }
}
