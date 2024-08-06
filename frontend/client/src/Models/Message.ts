import { Chat } from "./Chat";
import { User } from "./User";

export interface Message {
    id ? : number;
    content ? : string;
    timestamp ? : Date;
    user ? : User;
    chat ? : Chat;
}