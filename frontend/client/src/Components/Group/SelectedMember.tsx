import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { User } from '../../Models/User';

interface SelectedMemberProps {
    handleRemoveMember : () => void;
    member : User;
}

const SelectedMember: React.FC<SelectedMemberProps> = ({handleRemoveMember, member}) => {

    return (
        <div className='flex items-center bg-slate-300 rounded-full'>
            <img className='w-7 h-7 rounded-full' src={ (member.profilePicture !== null && member.profilePicture !== '') ? member.profilePicture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} />
            <p className='px-2'>{member.fullName}</p>
            <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer' />
        </div>
    )
}

export default SelectedMember