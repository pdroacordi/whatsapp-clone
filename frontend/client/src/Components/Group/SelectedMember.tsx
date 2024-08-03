import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface SelectedMemberProps {
    handleRemoveMember : () => void;
    member : any;
}

const SelectedMember: React.FC<SelectedMemberProps> = ({handleRemoveMember, member}) => {

    return (
        <div className='flex items-center bg-slate-300 rounded-full'>
            <img className='w-7 h-7 rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' />
            <p className='px-2'>Full Name</p>
            <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer' />
        </div>
    )
}

export default SelectedMember