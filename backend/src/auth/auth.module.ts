import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECERT } from 'src/config/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECERT,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
