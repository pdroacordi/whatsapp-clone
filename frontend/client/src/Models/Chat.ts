import { User } from "./User";

export interface Chat {
    id : number;
    chatName ? : string;
    chatImage ? : string;
    isGroupChat ? : boolean;
    createdBy ? : User;
    users : User[];
    admins ? : User[];
}