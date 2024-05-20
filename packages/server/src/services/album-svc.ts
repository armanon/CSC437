import { Album, AlbumModel } from "../models/album-model";

export const getAllAlbums = async (): Promise<Album[]> => {
  return AlbumModel.find();
};

export const getAlbumById = async (id: string): Promise<Album | null> => {
  return AlbumModel.findById(id);
};

export const addAlbum = async (album: Album): Promise<Album> => {
  const newAlbum = new AlbumModel(album);
  return newAlbum.save();
};

export const updateAlbum = async (id: string, updatedAlbum: Partial<Album>): Promise<Album | null> => {
  const foundAlbum = await AlbumModel.findById(id);
  if (!foundAlbum) throw new Error(`${id} Not Found`);
  return AlbumModel.findByIdAndUpdate(id, updatedAlbum, { new: true });
};

export const deleteAlbum = async (id: string): Promise<Album | null> => {
  return AlbumModel.findByIdAndRemove(id);
};
