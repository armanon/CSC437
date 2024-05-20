// src/services/track-svc.ts
import { Track, TrackModel } from "../models/track-model";

export const getAllTracks = async (): Promise<Track[]> => {
  return TrackModel.find();
};

export const getTrackById = async (id: string): Promise<Track | null> => {
  return TrackModel.findById(id);
};

export const addTrack = async (track: Track): Promise<Track> => {
  const newTrack = new TrackModel(track);
  return newTrack.save();
};

export const updateTrack = async (id: string, updatedTrack: Partial<Track>): Promise<Track | null> => {
  return TrackModel.findByIdAndUpdate(id, updatedTrack, { new: true });
};

export const deleteTrack = async (id: string): Promise<Track | null> => {
  return TrackModel.findByIdAndRemove(id);
};

export default { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack };
