// src/services/playlist-svc.ts
import { Playlist, PlaylistModel } from "../models/playlist-model";

export const getAllPlaylists = async (): Promise<Playlist[]> => {
  return PlaylistModel.find();
};

export const getPlaylistById = async (id: string): Promise<Playlist | null> => {
  return PlaylistModel.findById(id);
};

export const addPlaylist = async (playlist: Playlist): Promise<Playlist> => {
  const newPlaylist = new PlaylistModel(playlist);
  return newPlaylist.save();
};

export const updatePlaylist = async (id: string, updatedPlaylist: Partial<Playlist>): Promise<Playlist | null> => {
  return PlaylistModel.findByIdAndUpdate(id, updatedPlaylist, { new: true });
};

export const deletePlaylist = async (id: string): Promise<Playlist | null> => {
  return PlaylistModel.findByIdAndRemove(id);
};

export default { getAllPlaylists, getPlaylistById, addPlaylist, updatePlaylist, deletePlaylist };
