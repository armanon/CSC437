import { Concert } from "../models/concert-model";
export declare const getAllConcerts: () => Promise<Concert[]>;
export declare const getConcertById: (id: string) => Promise<Concert | null>;
export declare const addConcert: (concert: Concert) => Promise<Concert>;
export declare const updateConcert: (id: string, updatedConcert: Partial<Concert>) => Promise<Concert | null>;
export declare const deleteConcert: (id: string) => Promise<Concert | null>;
declare const _default: {
    getAllConcerts: () => Promise<Concert[]>;
    getConcertById: (id: string) => Promise<Concert | null>;
    addConcert: (concert: Concert) => Promise<Concert>;
    updateConcert: (id: string, updatedConcert: Partial<Concert>) => Promise<Concert | null>;
    deleteConcert: (id: string) => Promise<Concert | null>;
};
export default _default;
