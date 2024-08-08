import React from 'react'
import { User } from '../../Models/User';

interface ChatCardProps {
    isChat: boolean;
    chatName: string;
    chatImage: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ isChat, chatName, chatImage }) => {
    return (
        <div className='flex items-center justify-center py-2 px-3 group cursor-pointer'>
            <div className='w-14 h-14 overflow-hidden'>
                <img className='h-full w-full rounded-full object-cover' src={ chatImage !== '' ? chatImage : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}></img>
            </div>

            <div className='pl-5 w-[90%]'>
                <div className='flex justify-between items-center'>
                    <p className='text-lg'>{chatName}</p>
                    {isChat && <p className='text-sm'>Timestamp</p> }
                </div>
                {isChat &&
                    <div className='flex justify-between items-center'>
                        <p>message...</p>
                        <div className='flex space-x-2 items-center'>
                            <p className='text-xs py-1 px-2 text-white bg-green-500 rounded-full'>5</p>
                        </div>
                    </div>
                }
            </div>
            <div>

            </div>
        </div>
    )
}

export default ChatCard