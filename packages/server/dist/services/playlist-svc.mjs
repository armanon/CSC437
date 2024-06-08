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
import { PlaylistModel } from "../models/playlist-model";
const getAllPlaylists = () => __async(void 0, null, function* () {
  return PlaylistModel.find();
});
const getPlaylistById = (id) => __async(void 0, null, function* () {
  return PlaylistModel.findById(id);
});
const addPlaylist = (playlist) => __async(void 0, null, function* () {
  const newPlaylist = new PlaylistModel(playlist);
  return newPlaylist.save();
});
const updatePlaylist = (id, updatedPlaylist) => __async(void 0, null, function* () {
  return PlaylistModel.findByIdAndUpdate(id, updatedPlaylist, { new: true });
});
const deletePlaylist = (id) => __async(void 0, null, function* () {
  return PlaylistModel.findByIdAndRemove(id);
});
var playlist_svc_default = { getAllPlaylists, getPlaylistById, addPlaylist, updatePlaylist, deletePlaylist };
export {
  addPlaylist,
  playlist_svc_default as default,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist
};
