import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    contactNo: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
    },
    roadNo: {
      type: String,
    },
    floor: {
      type: String,
    },
    area: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.static('isUserExist', async function (email: string): Promise<
  Partial<IUser | null>
> {
  return UserModel.findOne({ email }).select(
    'firstName lastName email role contactNo password houseNo roadNo floor area'
  );
});

userSchema.static(
  'isPasswordMatched',
  async function (givenPass: string, savedPass: string): Promise<boolean> {
    return bcrypt.compare(givenPass, savedPass);
  }
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

const UserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default UserModel;
