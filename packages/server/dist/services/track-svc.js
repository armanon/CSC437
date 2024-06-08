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
var track_svc_exports = {};
__export(track_svc_exports, {
  addTrack: () => addTrack,
  default: () => track_svc_default,
  deleteTrack: () => deleteTrack,
  getAllTracks: () => getAllTracks,
  getTrackById: () => getTrackById,
  updateTrack: () => updateTrack
});
module.exports = __toCommonJS(track_svc_exports);
var import_track_model = require("../models/track-model");
const getAllTracks = () => __async(void 0, null, function* () {
  return import_track_model.TrackModel.find();
});
const getTrackById = (id) => __async(void 0, null, function* () {
  return import_track_model.TrackModel.findById(id);
});
const addTrack = (track) => __async(void 0, null, function* () {
  const newTrack = new import_track_model.TrackModel(track);
  return newTrack.save();
});
const updateTrack = (id, updatedTrack) => __async(void 0, null, function* () {
  return import_track_model.TrackModel.findByIdAndUpdate(id, updatedTrack, { new: true });
});
const deleteTrack = (id) => __async(void 0, null, function* () {
  return import_track_model.TrackModel.findByIdAndDelete(id);
});
var track_svc_default = { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addTrack,
  deleteTrack,
  getAllTracks,
  getTrackById,
  updateTrack
});
