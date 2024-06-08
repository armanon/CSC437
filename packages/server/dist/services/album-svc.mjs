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
import { AlbumModel } from "../models/album-model";
const getAllAlbums = () => __async(void 0, null, function* () {
  return AlbumModel.find();
});
const getAlbumById = (id) => __async(void 0, null, function* () {
  return AlbumModel.findById(id);
});
const addAlbum = (album) => __async(void 0, null, function* () {
  const newAlbum = new AlbumModel(album);
  return newAlbum.save();
});
const updateAlbum = (id, updatedAlbum) => __async(void 0, null, function* () {
  const foundAlbum = yield AlbumModel.findById(id);
  if (!foundAlbum) throw new Error(`${id} Not Found`);
  return AlbumModel.findByIdAndUpdate(id, updatedAlbum, { new: true });
});
const deleteAlbum = (id) => __async(void 0, null, function* () {
  return AlbumModel.findByIdAndRemove(id);
});
export {
  addAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum
};
