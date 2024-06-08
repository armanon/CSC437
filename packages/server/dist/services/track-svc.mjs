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
import { TrackModel } from "../models/track-model";
const getAllTracks = () => __async(void 0, null, function* () {
  return TrackModel.find();
});
const getTrackById = (id) => __async(void 0, null, function* () {
  return TrackModel.findById(id);
});
const addTrack = (track) => __async(void 0, null, function* () {
  const newTrack = new TrackModel(track);
  return newTrack.save();
});
const updateTrack = (id, updatedTrack) => __async(void 0, null, function* () {
  return TrackModel.findByIdAndUpdate(id, updatedTrack, { new: true });
});
const deleteTrack = (id) => __async(void 0, null, function* () {
  return TrackModel.findByIdAndRemove(id);
});
var track_svc_default = { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack };
export {
  addTrack,
  track_svc_default as default,
  deleteTrack,
  getAllTracks,
  getTrackById,
  updateTrack
};
