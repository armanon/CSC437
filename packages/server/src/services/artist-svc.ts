import { Artist, ArtistModel } from "../models/artist-model";

export const getAllArtists = async (): Promise<Artist[]> => {
  return ArtistModel.find();
};

export const getArtistById = async (id: string): Promise<Artist | null> => {
  return ArtistModel.findById(id);
};

export const addArtist = async (artist: Artist): Promise<Artist> => {
  const newArtist = new ArtistModel(artist);
  return newArtist.save();
};

export const updateArtist = async (id: string, updatedArtist: Partial<Artist>): Promise<Artist | null> => {
  const found = await ArtistModel.findOne({ _id: id });
  if (!found) throw `${id} Not Found`;
  const updated = await ArtistModel.findByIdAndUpdate(id, updatedArtist, { new: true });
  if (!updated) throw `${id} not updated`;
  return updated;
};

export const deleteArtist = async (id: string): Promise<Artist | null> => {
  return ArtistModel.findByIdAndDelete(id);
};
