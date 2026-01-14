import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}
