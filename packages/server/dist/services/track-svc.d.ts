import { Track } from "../models/track-model";
export declare const getAllTracks: () => Promise<Track[]>;
export declare const getTrackById: (id: string) => Promise<Track | null>;
export declare const addTrack: (track: Track) => Promise<Track>;
export declare const updateTrack: (id: string, updatedTrack: Partial<Track>) => Promise<Track | null>;
export declare const deleteTrack: (id: string) => Promise<Track | null>;
declare const _default: {
    getAllTracks: () => Promise<Track[]>;
    getTrackById: (id: string) => Promise<Track | null>;
    addTrack: (track: Track) => Promise<Track>;
    updateTrack: (id: string, updatedTrack: Partial<Track>) => Promise<Track | null>;
    deleteTrack: (id: string) => Promise<Track | null>;
};
export default _default;
