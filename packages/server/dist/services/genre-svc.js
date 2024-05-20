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
var genre_svc_exports = {};
__export(genre_svc_exports, {
  addGenre: () => addGenre,
  deleteGenre: () => deleteGenre,
  getAllGenres: () => getAllGenres,
  getGenreById: () => getGenreById,
  updateGenre: () => updateGenre
});
module.exports = __toCommonJS(genre_svc_exports);
var import_genre_model = require("../models/genre-model");
const getAllGenres = () => __async(void 0, null, function* () {
  return import_genre_model.GenreModel.find();
});
const getGenreById = (id) => __async(void 0, null, function* () {
  return import_genre_model.GenreModel.findById(id);
});
const addGenre = (genre) => __async(void 0, null, function* () {
  const newGenre = new import_genre_model.GenreModel(genre);
  return newGenre.save();
});
const updateGenre = (id, updatedGenre) => __async(void 0, null, function* () {
  return import_genre_model.GenreModel.findByIdAndUpdate(id, updatedGenre, { new: true });
});
const deleteGenre = (id) => __async(void 0, null, function* () {
  return import_genre_model.GenreModel.findByIdAndRemove(id);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
  updateGenre
});
