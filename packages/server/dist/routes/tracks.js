"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tracks_exports = {};
__export(tracks_exports, {
  default: () => tracks_default
});
module.exports = __toCommonJS(tracks_exports);
var import_express = __toESM(require("express"));
var import_track_svc = require("../services/track-svc");
const router = import_express.default.Router();
router.get("/", (req, res) => {
  res.json((0, import_track_svc.getAllTracks)());
});
router.get("/:id", (req, res) => {
  const track = (0, import_track_svc.getTrackById)(req.params.id);
  if (track) {
    res.json(track);
  } else {
    res.status(404).send("Track not found");
  }
});
router.post("/", (req, res) => {
  (0, import_track_svc.addTrack)(req.body);
  res.status(201).send("Track added");
});
router.put("/:id", (req, res) => {
  const updatedTrack = (0, import_track_svc.updateTrack)(req.params.id, req.body);
  if (updatedTrack) {
    res.json(updatedTrack);
  } else {
    res.status(404).send("Track not found");
  }
});
router.delete("/:id", (req, res) => {
  (0, import_track_svc.deleteTrack)(req.params.id);
  res.status(204).send();
});
var tracks_default = router;
