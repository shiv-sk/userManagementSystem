import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { comparePassword, encryptPassword } from './utils/handlePassword';
import { User } from './interface/user.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(userRegisterDto: UserRegisterDto) {
    const user = await this.userService.findUserByEmail(userRegisterDto.email);
    if (user) {
      throw new BadRequestException('email is already taken!');
    }
    const hashedPassword = await encryptPassword(userRegisterDto.password);
    const newUser = await this.userService.createNewUser({
      ...userRegisterDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const foundUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return foundUser;
  }

  async loginUser(user: User) {
    const userPayload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    const access_token = await this.jwtService.signAsync(userPayload);
    return access_token;
  }
}
