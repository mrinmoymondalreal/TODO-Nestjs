import { Body, Controller, Get, Headers, Logger } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async signIn(@Body() user: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(user);
  }

  @Get('me')
  async getUserDetails(
    @Headers('Authorization') token: string,
  ): Promise<Partial<User>> {
    Logger.log(token);
    return this.authService.getUserDetails(token.split(' ')[1]);
  }
}
