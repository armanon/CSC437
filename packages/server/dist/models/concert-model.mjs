import mongoose from "mongoose";
import { Concert } from "./concert";
const concertSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true, trim: true },
  artists: [{ type: String, trim: true }]
}, { collection: "concerts" });
const ConcertModel = mongoose.model("Concert", concertSchema);
export {
  Concert,
  ConcertModel
};
