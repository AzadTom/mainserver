import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }
    ),
    UserModule,
    MailModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '60s' }
    })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]

})
export class AuthModule { }
