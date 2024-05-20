// src/services/concert-svc.ts
import { Concert, ConcertModel } from "../models/concert-model";

export const getAllConcerts = async (): Promise<Concert[]> => {
  return ConcertModel.find();
};

export const getConcertById = async (id: string): Promise<Concert | null> => {
  return ConcertModel.findById(id);
};

export const addConcert = async (concert: Concert): Promise<Concert> => {
  const newConcert = new ConcertModel(concert);
  return newConcert.save();
};

export const updateConcert = async (id: string, updatedConcert: Partial<Concert>): Promise<Concert | null> => {
  return ConcertModel.findByIdAndUpdate(id, updatedConcert, { new: true });
};

export const deleteConcert = async (id: string): Promise<Concert | null> => {
  return ConcertModel.findByIdAndRemove(id);
};

export default { getAllConcerts, getConcertById, addConcert, updateConcert, deleteConcert };
