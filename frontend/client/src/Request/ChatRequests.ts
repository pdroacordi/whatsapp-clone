export interface PrivateChatRequest{
    reqUserId ? : number;
    recUserId ? : number;
}

export interface GroupChatRequest{
    userIds ? : number[];
    chatName ? : string;
    chatImage ? : string;
    creatorUserId ? : number;
}