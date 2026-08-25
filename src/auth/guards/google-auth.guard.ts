import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    getAuthenticateOptions(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const origin = request.headers.origin;

        const isLocalhost =
            origin?.includes('localhost');

        return {
            state: JSON.stringify({
                product: request.query.product,
                environment: isLocalhost ? 'local' : 'production',
            }),
        };
    }
}
