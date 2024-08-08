import React from 'react'
import { letterToColor } from '../../Util/Util';

interface MessageCardProps {
    isReqUserMessage: boolean;
    isChatMessage: boolean;
    senderName: string;
    content: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ isReqUserMessage, isChatMessage, senderName, content }) => {

    return (
        <div className={`p-2 rounded-md max-w-[50%] min-w-12 ${isReqUserMessage ? ' self-end bg-[#d9fdd3]' : 'self-start bg-white'}`}>
            {isChatMessage && !isReqUserMessage &&
                <p className={`text-[${letterToColor(senderName[0])}] font-semibold`}>{senderName}</p>
            }
            <p>{content}</p>
        </div>
    )
}
