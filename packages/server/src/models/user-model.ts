import mongoose from 'mongoose';
import { User } from './user';

const userSchema = new mongoose.Schema<User>({
  _id: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
}, { collection: 'users' });

const UserModel = mongoose.model<User>('User', userSchema);

export { UserModel, User };
