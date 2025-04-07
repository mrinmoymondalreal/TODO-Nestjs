import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signIn(user: SignInDto): Promise<{ accessToken: string }> {
    const usr = await this.userService.findByEmail(user.email);
    Logger.log(usr);
    if (!usr)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    const isPasswordValid = await bcrypt.compare(user.password, usr.password);
    if (!isPasswordValid)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    return this.generateJwt(usr);
  }

  async getUserDetails(token: string) {
    try {
      const decoded = this.verifyToken(token);
      const tempUser = await this.userService.findOne(decoded.id);
      if (!tempUser)
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      const { password, ...user } = tempUser;
      return user;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  generateJwt(user: User): { accessToken: string } {
    const payload = { id: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  verifyToken(token: string): Record<string, any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
