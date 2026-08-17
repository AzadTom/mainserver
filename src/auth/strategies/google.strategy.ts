import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export interface GoogleUserPayload {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  accessToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const email = emails?.[0]?.value;
    const firstName = name?.givenName || '';
    const lastName = name?.familyName || '';
    const picture = photos?.[0]?.value;

    
    this.logger.log(`Google OAuth Profile received:`);
    this.logger.log(`- Google ID: ${id}`);
    this.logger.log(`- Email: ${email}`);
    this.logger.log(`- First Name: ${firstName}`);
    this.logger.log(`- Last Name: ${lastName}`);
    this.logger.log(`- Picture URL: ${picture}`);

    const user: GoogleUserPayload = {
      googleId: id,
      email,
      firstName,
      lastName,
      picture,
      accessToken,
    };

    done(null, user);
  }
}
