import mongoose from 'mongoose';
import { Concert } from './concert';

const concertSchema = new mongoose.Schema<Concert>({
  _id: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
}, { collection: 'concerts' });

const ConcertModel = mongoose.model<Concert>('Concert', concertSchema);

export { ConcertModel, Concert };
