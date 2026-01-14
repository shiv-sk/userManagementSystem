import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from 'commons/user.roles';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true, unique: true })
  email: string;

  @Prop({ trim: true, required: true })
  password: string;

  @Prop({ type: String, enum: UserRoles, trim: true, default: UserRoles.user })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
