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
var album_svc_exports = {};
__export(album_svc_exports, {
  addAlbum: () => addAlbum,
  deleteAlbum: () => deleteAlbum,
  getAlbumById: () => getAlbumById,
  getAllAlbums: () => getAllAlbums,
  updateAlbum: () => updateAlbum
});
module.exports = __toCommonJS(album_svc_exports);
var import_album_model = require("../models/album-model");
const getAllAlbums = () => __async(void 0, null, function* () {
  return import_album_model.AlbumModel.find();
});
const getAlbumById = (id) => __async(void 0, null, function* () {
  return import_album_model.AlbumModel.findById(id);
});
const addAlbum = (album) => __async(void 0, null, function* () {
  const newAlbum = new import_album_model.AlbumModel(album);
  return newAlbum.save();
});
const updateAlbum = (id, updatedAlbum) => __async(void 0, null, function* () {
  return import_album_model.AlbumModel.findByIdAndUpdate(id, updatedAlbum, { new: true });
});
const deleteAlbum = (id) => __async(void 0, null, function* () {
  return import_album_model.AlbumModel.findByIdAndRemove(id);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum
});
