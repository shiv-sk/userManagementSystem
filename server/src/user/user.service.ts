import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { UserRegisterDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    // if (!user) {
    //   throw new NotFoundException('user not found5555!');
    // }
    return user;
  }

  async findUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  async createNewUser(userregisterDto: UserRegisterDto) {
    const user = await this.userModel.create({ ...userregisterDto });
    if (!user) {
      throw new InternalServerErrorException('user not created!');
    }
    const newUser = {
      name: user.name,
      email: user.email,
      id: user._id,
      role: user.role,
    };
    return newUser;
  }

  async findAllUsers() {
    const user = await this.userModel.find();
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('user not found and updated!');
    }
    const updatedUser = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    };
    return updatedUser;
  }

  async removeUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('user not found and deleted!');
    }
    return 'user deleted successfully!';
  }
}
