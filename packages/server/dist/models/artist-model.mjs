import mongoose from "mongoose";
import { Artist } from "./artist";
const artistSchema = new mongoose.Schema({
  id: {
    type: String,
    /*required: true,*/
    trim: true
  },
  name: { type: String, required: true, trim: true },
  genres: [{ type: String, required: true, trim: true }],
  bio: { type: String, trim: true }
}, { collection: "artists" });
const ArtistModel = mongoose.model("Artist", artistSchema);
export {
  Artist,
  ArtistModel
};
