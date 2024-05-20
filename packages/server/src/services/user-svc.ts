// src/services/user-svc.ts
import { User, UserModel } from "../models/user-model";

export const getAllUsers = async (): Promise<User[]> => {
  return UserModel.find();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return UserModel.findById(id);
};

export const addUser = async (user: User): Promise<User> => {
  const newUser = new UserModel(user);
  return newUser.save();
};

export const updateUser = async (id: string, updatedUser: Partial<User>): Promise<User | null> => {
  return UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
};

export const deleteUser = async (id: string): Promise<User | null> => {
  return UserModel.findByIdAndRemove(id);
};

export default { getAllUsers, getUserById, addUser, updateUser, deleteUser };
