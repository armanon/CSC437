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
var artists_exports = {};
__export(artists_exports, {
  default: () => artists_default
});
module.exports = __toCommonJS(artists_exports);
var import_express = __toESM(require("express"));
var ArtistService = __toESM(require("../services/artist-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  res.json(ArtistService.getAllArtists());
});
router.get("/:id", (req, res) => {
  const artist = ArtistService.getArtistById(req.params.id);
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).send("Artist not found");
  }
});
router.post("/", (req, res) => {
  ArtistService.addArtist(req.body);
  res.status(201).send("Artist added");
});
router.put("/:id", (req, res) => {
  const artist = ArtistService.updateArtist(req.params.id, req.body);
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).send("Artist not found");
  }
});
router.delete("/:id", (req, res) => {
  ArtistService.deleteArtist(req.params.id);
  res.status(204).send("Artist deleted");
});
var artists_default = router;
