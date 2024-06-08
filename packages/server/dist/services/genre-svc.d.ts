import { Genre } from "../models/genre-model";
export declare const getAllGenres: () => Promise<Genre[]>;
export declare const getGenreById: (id: string) => Promise<Genre | null>;
export declare const addGenre: (genre: Genre) => Promise<Genre>;
export declare const updateGenre: (id: string, updatedGenre: Partial<Genre>) => Promise<Genre | null>;
export declare const deleteGenre: (id: string) => Promise<Genre | null>;
declare const _default: {
    getAllGenres: () => Promise<Genre[]>;
    getGenreById: (id: string) => Promise<Genre | null>;
    addGenre: (genre: Genre) => Promise<Genre>;
    updateGenre: (id: string, updatedGenre: Partial<Genre>) => Promise<Genre | null>;
    deleteGenre: (id: string) => Promise<Genre | null>;
};
export default _default;
