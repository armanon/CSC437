// src/services/genre-svc.ts
import { Genre, GenreModel } from "../models/genre-model";

export const getAllGenres = async (): Promise<Genre[]> => {
  return GenreModel.find();
};

export const getGenreById = async (id: string): Promise<Genre | null> => {
  return GenreModel.findById(id);
};

export const addGenre = async (genre: Genre): Promise<Genre> => {
  const newGenre = new GenreModel(genre);
  return newGenre.save();
};

export const updateGenre = async (id: string, updatedGenre: Partial<Genre>): Promise<Genre | null> => {
  return GenreModel.findByIdAndUpdate(id, updatedGenre, { new: true });
};

export const deleteGenre = async (id: string): Promise<Genre | null> => {
  return GenreModel.findByIdAndDelete(id);
};

export default { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre };
