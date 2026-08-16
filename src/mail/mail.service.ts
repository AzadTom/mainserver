import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        const user = this.configService.get<string>('EMAIL_USER');
        const pass = this.configService.get<string>('EMAIL_PASSWORD');

        if (!user || !pass) {
            throw new Error('EMAIL_USER and EMAIL_PASSWORD must be set in .env');
        }

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        });
    }

    async sendResetEmail(email: string, link: string) {
        try {
            await this.transporter.sendMail({
                from: this.configService.get<string>('EMAIL_USER'),
                to: email,
                subject: 'Reset your password',
                html: `
          <p>You requested a password reset.</p>
          <p>
            <a href="${link}">Click here to reset your password</a>
          </p>
          <p>This link will expire in 15 minutes.</p>
        `,
            });

            return { message: 'Reset link sent to email' };

        } catch (error) {
            console.error('Mail send failed:', error);
            if (error?.code === 'EAUTH') {
                throw new UnauthorizedException('Email credentials are invalid');
            }
            throw new InternalServerErrorException('Email could not be sent');
        }
    }
}
