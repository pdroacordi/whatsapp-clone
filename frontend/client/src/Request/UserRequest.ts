import { User } from "../Models/User";

export interface UserRequest {
    token ? : string;
    user  : User;
    query ? : string;
    page ? : number;
}