import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    getAuthenticateOptions(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const product = request.query.product
        const clientUrl = request.query.clientUrl;

        return {
            state: JSON.stringify({
                product: product,
                environment: clientUrl,
            }),
        };
    }
}
