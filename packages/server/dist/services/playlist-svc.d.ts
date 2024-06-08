import { Playlist } from "../models/playlist-model";
export declare const getAllPlaylists: () => Promise<Playlist[]>;
export declare const getPlaylistById: (id: string) => Promise<Playlist | null>;
export declare const addPlaylist: (playlist: Playlist) => Promise<Playlist>;
export declare const updatePlaylist: (id: string, updatedPlaylist: Partial<Playlist>) => Promise<Playlist | null>;
export declare const deletePlaylist: (id: string) => Promise<Playlist | null>;
declare const _default: {
    getAllPlaylists: () => Promise<Playlist[]>;
    getPlaylistById: (id: string) => Promise<Playlist | null>;
    addPlaylist: (playlist: Playlist) => Promise<Playlist>;
    updatePlaylist: (id: string, updatedPlaylist: Partial<Playlist>) => Promise<Playlist | null>;
    deletePlaylist: (id: string) => Promise<Playlist | null>;
};
export default _default;
