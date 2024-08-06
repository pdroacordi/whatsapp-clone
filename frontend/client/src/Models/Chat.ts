import { User } from "./User";

export interface Chat {
    id : number;
    chatName ? : string;
    chatImage ? : string;
    isGroupChat ? : boolean;
    createdBy ? : User | null;
    users ? : Set<User>;
    admins ? : Set<User>;
}