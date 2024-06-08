import { Album } from "../models/album-model";
export declare const getAllAlbums: () => Promise<Album[]>;
export declare const getAlbumById: (id: string) => Promise<Album | null>;
export declare const addAlbum: (album: Album) => Promise<Album>;
export declare const updateAlbum: (id: string, updatedAlbum: Partial<Album>) => Promise<Album | null>;
export declare const deleteAlbum: (id: string) => Promise<Album | null>;
