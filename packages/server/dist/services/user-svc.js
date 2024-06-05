"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var user_svc_exports = {};
__export(user_svc_exports, {
  addUser: () => addUser,
  default: () => user_svc_default,
  deleteUser: () => deleteUser,
  getAllUsers: () => getAllUsers,
  getUserById: () => getUserById,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_svc_exports);
var import_user_model = require("../models/user-model");
const getAllUsers = () => __async(void 0, null, function* () {
  return import_user_model.UserModel.find();
});
const getUserById = (id) => __async(void 0, null, function* () {
  return import_user_model.UserModel.findById(id);
});
const addUser = (user) => __async(void 0, null, function* () {
  const newUser = new import_user_model.UserModel(user);
  return newUser.save();
});
const updateUser = (id, updatedUser) => __async(void 0, null, function* () {
  return import_user_model.UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
});
const deleteUser = (id) => __async(void 0, null, function* () {
  return import_user_model.UserModel.findByIdAndRemove(id);
});
var user_svc_default = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
});
