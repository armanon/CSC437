import mongoose from "mongoose";
import { User } from "./user";
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  favoriteGenres: [{ type: String, trim: true }]
}, { collection: "users" });
const UserModel = mongoose.model("User", userSchema);
export {
  User,
  UserModel
};
