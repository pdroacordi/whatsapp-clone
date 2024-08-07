import { User } from "./User";

export interface UserPageable {
    content : User[];
    first : boolean;
    last : boolean;
    number : number;
}