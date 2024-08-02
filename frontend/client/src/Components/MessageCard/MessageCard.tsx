import React from 'react'

interface MessageCardProps {
    isReqUserMessage: boolean;
    content: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ isReqUserMessage, content }) => {

    return (
        <div className={`p-2 rounded-md max-w-[50%] min-w-12 ${isReqUserMessage ? ' self-end bg-[#d9fdd3]' : 'self-start bg-white' }`}>
            <p>{content}</p>
        </div>
    )
}
