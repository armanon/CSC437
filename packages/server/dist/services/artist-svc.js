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
var artist_svc_exports = {};
__export(artist_svc_exports, {
  addArtist: () => addArtist,
  deleteArtist: () => deleteArtist,
  getAllArtists: () => getAllArtists,
  getArtistById: () => getArtistById,
  updateArtist: () => updateArtist
});
module.exports = __toCommonJS(artist_svc_exports);
var import_artist_model = require("../models/artist-model");
const getAllArtists = () => __async(void 0, null, function* () {
  return import_artist_model.ArtistModel.find();
});
const getArtistById = (id) => __async(void 0, null, function* () {
  return import_artist_model.ArtistModel.findById(id);
});
const addArtist = (artist) => __async(void 0, null, function* () {
  const newArtist = new import_artist_model.ArtistModel(artist);
  return newArtist.save();
});
const updateArtist = (id, updatedArtist) => __async(void 0, null, function* () {
  return import_artist_model.ArtistModel.findByIdAndUpdate(id, updatedArtist, { new: true });
});
const deleteArtist = (id) => __async(void 0, null, function* () {
  return import_artist_model.ArtistModel.findByIdAndRemove(id);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  updateArtist
});
