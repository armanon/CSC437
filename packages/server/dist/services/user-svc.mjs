var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { UserModel } from "../models/user-model";
const getAllUsers = () => __async(void 0, null, function* () {
  return UserModel.find();
});
const getUserById = (id) => __async(void 0, null, function* () {
  return UserModel.findById(id);
});
const addUser = (user) => __async(void 0, null, function* () {
  const newUser = new UserModel(user);
  return newUser.save();
});
const updateUser = (id, updatedUser) => __async(void 0, null, function* () {
  return UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
});
const deleteUser = (id) => __async(void 0, null, function* () {
  return UserModel.findByIdAndRemove(id);
});
var user_svc_default = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
export {
  addUser,
  user_svc_default as default,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
};
