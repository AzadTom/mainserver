import { Body, Controller, Get, Headers, NotFoundException, Param, Post, Redirect, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto, resetPasswordDto } from './dto/register.dto';
import * as crypto from 'crypto';
import type { Request, Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly mailService: MailService) { }

    @Post("/send-mail")
    async sendMail(@Req() req: Request, @Body("email") email: string) {

        const token = crypto.randomBytes(32).toString('hex');
        const host = req.get('host');
        const protocol = req.protocol;
        const resetLink = `${protocol}://${host}/auth/reset-password/${token}`;
        const result = await this.authService.saveTokenByUser(token, email);
        if (result?.message === 'User not found') {
            throw new NotFoundException('User not found');
        }
        await this.mailService.sendResetEmail(
            email,
            resetLink,
        );
        return { message: 'Reset link sent to email' };
    }

    @Get("/reset-password/:token")
    @Render("reset-password")
    forgetpasswordRender(@Param("token") token: string) {
        return { message: 'Reset your password', token };
    }

    @Post("/reset-password")
    @Redirect('/auth/success')
    async forget_password(@Body() resetPasswordDto: resetPasswordDto, @Res() res: Response) {
        return await this.authService.resetPassword(resetPasswordDto);

    }

    @Get("/success")
    @Render("success")
    success() {
        return { message: 'Your password has been reset successfully.' };
    }

    @Post("/signup")
    async signup(@Body() registerDto: registerDto, @Res({ passthrough: true }) res: Response) {
        const { access_token, refreash_token, message } = await this.authService.signup(registerDto);
        if (access_token && refreash_token) {
            res.cookie('refreash_token', refreash_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/'
            });
            return {
                status: 200,
                data: { access_token },
                message: 'User created successfully'
            };
        }

        return {
            status: 400,
            message,
            data: null
        };
    }

    @Post("/signin")
    async singin(@Body() registerDto: registerDto, @Res({ passthrough: true }) res: Response) {
        const { access_token, refreash_token, message } = await this.authService.signin(registerDto);

        if (access_token && refreash_token) {
            res.cookie('refreash_token', refreash_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/'
            });
            return {
                access_token
            };
        }
        return { message };
    }

    @Post("/signout")
    async signout(@Req() req: Request) {
        const token = req.cookies['refreash_token'];
        this.authService.signout(token);
    }

    @Get("/refresh-token")
    async refreashToken(@Req() req: Request) {
        const token = req.cookies['refreash_token'];
        this.authService.getNewAccessToken(token);
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req: Request) { }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const productName = req.query.state;
        const profile = req.user as any;
        if (!profile) {
            return {
                status: 400,
                message: 'Google authentication failed',
                data: null,
            };

        }

        const { access_token, refreash_token } = await this.authService.validateGoogleUser({ ...profile, platform: productName });

        res.cookie('refreash_token', refreash_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        return {
            status: 200,
            data: { access_token },
            message: 'User logged in via Google successfully'
        };
    }
}
