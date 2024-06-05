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
var concert_svc_exports = {};
__export(concert_svc_exports, {
  addConcert: () => addConcert,
  default: () => concert_svc_default,
  deleteConcert: () => deleteConcert,
  getAllConcerts: () => getAllConcerts,
  getConcertById: () => getConcertById,
  updateConcert: () => updateConcert
});
module.exports = __toCommonJS(concert_svc_exports);
var import_concert_model = require("../models/concert-model");
const getAllConcerts = () => __async(void 0, null, function* () {
  return import_concert_model.ConcertModel.find();
});
const getConcertById = (id) => __async(void 0, null, function* () {
  return import_concert_model.ConcertModel.findById(id);
});
const addConcert = (concert) => __async(void 0, null, function* () {
  const newConcert = new import_concert_model.ConcertModel(concert);
  return newConcert.save();
});
const updateConcert = (id, updatedConcert) => __async(void 0, null, function* () {
  return import_concert_model.ConcertModel.findByIdAndUpdate(id, updatedConcert, { new: true });
});
const deleteConcert = (id) => __async(void 0, null, function* () {
  return import_concert_model.ConcertModel.findByIdAndRemove(id);
});
var concert_svc_default = { getAllConcerts, getConcertById, addConcert, updateConcert, deleteConcert };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addConcert,
  deleteConcert,
  getAllConcerts,
  getConcertById,
  updateConcert
});
