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
import { GenreModel } from "../models/genre-model";
const getAllGenres = () => __async(void 0, null, function* () {
  return GenreModel.find();
});
const getGenreById = (id) => __async(void 0, null, function* () {
  return GenreModel.findById(id);
});
const addGenre = (genre) => __async(void 0, null, function* () {
  const newGenre = new GenreModel(genre);
  return newGenre.save();
});
const updateGenre = (id, updatedGenre) => __async(void 0, null, function* () {
  return GenreModel.findByIdAndUpdate(id, updatedGenre, { new: true });
});
const deleteGenre = (id) => __async(void 0, null, function* () {
  return GenreModel.findByIdAndRemove(id);
});
var genre_svc_default = { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre };
export {
  addGenre,
  genre_svc_default as default,
  deleteGenre,
  getAllGenres,
  getGenreById,
  updateGenre
};
