import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 200)
  password: string;
}
