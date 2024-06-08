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
import { ArtistModel } from "../models/artist-model";
const getAllArtists = () => __async(void 0, null, function* () {
  return ArtistModel.find();
});
const getArtistById = (id) => __async(void 0, null, function* () {
  return ArtistModel.findById(id);
});
const addArtist = (artist) => __async(void 0, null, function* () {
  const newArtist = new ArtistModel(artist);
  return newArtist.save();
});
const updateArtist = (id, updatedArtist) => __async(void 0, null, function* () {
  const found = yield ArtistModel.findOne({ _id: id });
  if (!found) throw `${id} Not Found`;
  const updated = yield ArtistModel.findByIdAndUpdate(id, updatedArtist, { new: true });
  if (!updated) throw `${id} not updated`;
  return updated;
});
const deleteArtist = (id) => __async(void 0, null, function* () {
  return ArtistModel.findByIdAndRemove(id);
});
export {
  addArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  updateArtist
};
