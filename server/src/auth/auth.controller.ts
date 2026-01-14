import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    const newUser = this.authService.registerUser(userRegisterDto);
    return newUser;
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newUser = await this.authService.validateUser(userLoginDto);
    const access_token = await this.authService.loginUser(newUser);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return newUser;
  }

  @Get('/logout')
  logoutUser() {}

  @Get('/me')
  currentUser() {}
}
