import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRoles } from 'commons/user.roles';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 200)
  password: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role: UserRoles;
}
