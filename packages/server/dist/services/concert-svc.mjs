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
import { ConcertModel } from "../models/concert-model";
const getAllConcerts = () => __async(void 0, null, function* () {
  return ConcertModel.find();
});
const getConcertById = (id) => __async(void 0, null, function* () {
  return ConcertModel.findById(id);
});
const addConcert = (concert) => __async(void 0, null, function* () {
  const newConcert = new ConcertModel(concert);
  return newConcert.save();
});
const updateConcert = (id, updatedConcert) => __async(void 0, null, function* () {
  return ConcertModel.findByIdAndUpdate(id, updatedConcert, { new: true });
});
const deleteConcert = (id) => __async(void 0, null, function* () {
  return ConcertModel.findByIdAndRemove(id);
});
var concert_svc_default = { getAllConcerts, getConcertById, addConcert, updateConcert, deleteConcert };
export {
  addConcert,
  concert_svc_default as default,
  deleteConcert,
  getAllConcerts,
  getConcertById,
  updateConcert
};
