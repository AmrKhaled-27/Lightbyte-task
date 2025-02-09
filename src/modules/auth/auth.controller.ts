import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccessTokenDto } from './dtos/access-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: 'Sign up a new user',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
        description: 'User signed up successfully',
    })
    @ApiOkResponse({
        description: 'Invalid user credentials',
    })
    @Post('signup')
    async signUp(@Body() AuthDto: AuthDto) {
        return this.authService.signUp(AuthDto);
    }

    @ApiOperation({
        summary: 'Logs in a user',
    })
    @ApiOkResponse({
        type: AccessTokenDto,
        description: 'User logged in successfully',
    })
    @ApiOkResponse({
        description: 'Invalid user credentials',
    })
    @Post('login')
    async login(@Body() AuthDto: AuthDto) {
        return this.authService.login(AuthDto);
    }
}
