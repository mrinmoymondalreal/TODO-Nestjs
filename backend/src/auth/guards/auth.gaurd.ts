import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token not found');
    try {
      const decoded = this.authService.getUserDetails(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token not found');
    }
  }
}
