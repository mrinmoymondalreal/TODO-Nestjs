import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { AuthGaurd } from './guards/auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async signIn(@Body() user: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(user);
  }

  @UseGuards(AuthGaurd)
  @Get('me')
  async getUserDetails(@Request() req): Promise<Partial<User>> {
    return req.user;
  }
}
