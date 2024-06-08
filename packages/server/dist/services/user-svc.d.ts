import { User } from "../models/user-model";
export declare const getAllUsers: () => Promise<User[]>;
export declare const getUserById: (id: string) => Promise<User | null>;
export declare const addUser: (user: User) => Promise<User>;
export declare const updateUser: (id: string, updatedUser: Partial<User>) => Promise<User | null>;
export declare const deleteUser: (id: string) => Promise<User | null>;
declare const _default: {
    getAllUsers: () => Promise<User[]>;
    getUserById: (id: string) => Promise<User | null>;
    addUser: (user: User) => Promise<User>;
    updateUser: (id: string, updatedUser: Partial<User>) => Promise<User | null>;
    deleteUser: (id: string) => Promise<User | null>;
};
export default _default;
