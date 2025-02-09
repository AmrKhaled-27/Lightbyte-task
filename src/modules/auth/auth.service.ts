import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User, UserRepository } from './user.repository';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp({ email, password }: AuthDto) {
        const doesUserExist = await this.doesUserExist(email);

        if (doesUserExist) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepo.create({
            email,
            password: hashedPassword,
        });

        return {
            access_token: this.generateToken(newUser),
        };
    }

    async login({ email, password }: AuthDto) {
        const user = await this.userRepo.findByEmail(email);
        const isUserValid = await this.isUserValid(user, password);

        if (!isUserValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            access_token: this.generateToken(user),
        };
    }

    verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (e) {
            return null;
        }
    }
    // Helper functions
    private async doesUserExist(email: string) {
        const user = await this.userRepo.findByEmail(email);
        return !!user;
    }

    private async isUserValid(user: User, password: string) {
        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    }

    private generateToken(user: User) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
