import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User, UserRepository } from './user.repository';
import { SignUpDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp({ email, password }: SignUpDto) {
        const doesUserExist = await this.doesUserExist(email);

        if (doesUserExist) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepo.create({ email, password: hashedPassword });
    }

    async login({ email, password }: SignUpDto) {
        const user = await this.userRepo.findByEmail(email);
        const isUserValid = await this.isUserValid(user, password);

        if (!isUserValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            access_token: this.generateToken(user),
        };
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
