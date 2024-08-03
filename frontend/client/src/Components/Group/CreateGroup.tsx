import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SelectedMember from './SelectedMember';
import ChatCard from '../ChatCard/ChatCard';
import { User } from '../../Models/User';
import NewGroup from './NewGroup';

interface CreateGroupProps {
    handleCloseOpenCreateGroup: () => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ handleCloseOpenCreateGroup }) => {
    const [newGroup, setNewGroup] = useState<boolean | false>(false);
    const [groupMember, setGroupMember] = useState<Set<User>>(new Set());
    const [query, setQuery] = useState<string | ''>('');

    const handleRemoveMember = (member: User) => {
        const updatedMembers = new Set(groupMember);
        updatedMembers.delete(member);
        setGroupMember(updatedMembers);
    }

    const handleAddMember = (member: User) => {
        const updatedMembers = new Set(groupMember);
        updatedMembers.add(member);
        setGroupMember(updatedMembers);
    }

    const handleSearch = (e: string) => {

    }

    const handleNewGroup = () => {
        setNewGroup(!newGroup);
    }


    return (
        <div className='w-full h-full flex flex-col'>
            {!newGroup &&
                <div className='flex flex-col flex-grow overflow-hidden'>
                    <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 py-5'>
                        <BsArrowLeft onClick={handleCloseOpenCreateGroup} className='cursor-pointer text-2xl font-bold' />
                        <p className='text-xl font-semibold'>Add group members</p>
                    </div>
                    <div className='bg-white py-4 px-3'>
                        <div className='flex space-x-2 flex-wrap space-y-1'>
                            {groupMember.size > 0 && Array.from(groupMember).map((item) => <SelectedMember handleRemoveMember={() => handleRemoveMember(item)} member={item} />)}
                        </div>
                        <input type="text" onChange={(e) => {
                            handleSearch(e.target.value)
                            setQuery(e.target.value)
                        }} className='outline-none border-b border-[#888888] p-2 w-[93%]' placeholder='Search user' value={query} />
                    </div>

                    <div className='bg-white overflow-y-auto flex-grow'>
                        {query && [{ "id": 1 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }, { "id": 2 }].map((item) =>
                            <div onClick={() => handleAddMember(item)} key={item?.id}>
                                <ChatCard isChat={false}/>
                            </div>)}
                    </div>
                    <div className='bottom-10 flex items-center justify-center bg-white border py-10'>
                        <div className='bg-[#008069] rounded-full flex items-center justify-center h-16 w-16 cursor-pointer' onClick={() => { setNewGroup(true) }}>
                            <BsArrowRight className='text-white font-bold text-3xl' />
                        </div>
                    </div>
                </div>
            }
            {newGroup &&
                <NewGroup handleBackStep={handleNewGroup}/>
            }
        </div>
    )
}

export default CreateGroup