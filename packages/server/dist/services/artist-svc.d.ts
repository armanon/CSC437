import { Artist } from "../models/artist-model";
export declare const getAllArtists: () => Promise<Artist[]>;
export declare const getArtistById: (id: string) => Promise<Artist | null>;
export declare const addArtist: (artist: Artist) => Promise<Artist>;
export declare const updateArtist: (id: string, updatedArtist: Partial<Artist>) => Promise<Artist | null>;
export declare const deleteArtist: (id: string) => Promise<Artist | null>;
