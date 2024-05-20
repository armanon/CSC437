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
var playlist_svc_exports = {};
__export(playlist_svc_exports, {
  addPlaylist: () => addPlaylist,
  deletePlaylist: () => deletePlaylist,
  getAllPlaylists: () => getAllPlaylists,
  getPlaylistById: () => getPlaylistById,
  updatePlaylist: () => updatePlaylist
});
module.exports = __toCommonJS(playlist_svc_exports);
var import_playlist_model = require("../models/playlist-model");
const getAllPlaylists = () => __async(void 0, null, function* () {
  return import_playlist_model.PlaylistModel.find();
});
const getPlaylistById = (id) => __async(void 0, null, function* () {
  return import_playlist_model.PlaylistModel.findById(id);
});
const addPlaylist = (playlist) => __async(void 0, null, function* () {
  const newPlaylist = new import_playlist_model.PlaylistModel(playlist);
  return newPlaylist.save();
});
const updatePlaylist = (id, updatedPlaylist) => __async(void 0, null, function* () {
  return import_playlist_model.PlaylistModel.findByIdAndUpdate(id, updatedPlaylist, { new: true });
});
const deletePlaylist = (id) => __async(void 0, null, function* () {
  return import_playlist_model.PlaylistModel.findByIdAndRemove(id);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist
});
