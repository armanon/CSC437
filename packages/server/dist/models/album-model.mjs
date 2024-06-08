import mongoose from "mongoose";
const albumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  tracks: [{ type: String, trim: true }],
  artist: { type: String, required: true, trim: true },
  releaseDate: { type: String, trim: true }
}, { collection: "albums" });
const AlbumModel = mongoose.model("Album", albumSchema);
export {
  AlbumModel
};
