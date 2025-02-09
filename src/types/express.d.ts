import { Request } from 'express';

declare module 'express' {
    interface Request {
        user?: {
            email: string;
            sub: string;
        };
    }
}
