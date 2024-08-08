import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SelectedMember from './SelectedMember';
import ChatCard from '../ChatCard/ChatCard';
import { User } from '../../Models/User';
import NewGroup from './NewGroup';
import { AppDispatch, RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { searchForUser } from '../../Redux/features/user/userSlice';
import { Alert, Snackbar } from '@mui/material';
import { BiDownArrow } from 'react-icons/bi';

interface CreateGroupProps {
    handleCloseOpenCreateGroup: () => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ handleCloseOpenCreateGroup }) => {
    const [newGroup, setNewGroup] = useState<boolean | false>(false);
    const [groupMember, setGroupMember] = useState<Set<User>>(new Set());
    const [query, setQuery] = useState<string | ''>('');

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | ''>('');
    const [isSnackbarSuccessful, setIsSnackbarSuccessful] = useState<boolean>(true);

    const { curUser, searchUsers } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('token') || '';

    const [resultUsers, setResultUsers] = useState<User[]>([]);

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
        dispatch(searchForUser({ query: e, page: 0, token: token }))
            .then(result => {
                if (result.payload.status !== 200) {
                    setSnackbarMessage('Failed to search: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to search: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    }

    const handleSeeMoreClick = () => {
        if (query === '')
            return;
        if (token !== null && query !== null) {
            const page = searchUsers?.number ?? 0
            dispatch(searchForUser({ query: query, page: page + 1, token: token }))
                .then(result => {
                    if (result.payload.status !== 200) {
                        setSnackbarMessage('Failed to search: ' + result.payload.message);
                        setIsSnackbarSuccessful(false);
                        setOpenSnackbar(true);
                    }
                })
                .catch(error => {
                    setSnackbarMessage('Failed to search: ' + error);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                });
        }
    }

    const handleNewGroup = (option : number) => {
        setNewGroup(!newGroup);
        if(option === 1)
            handleCloseOpenCreateGroup();
    }

    const handleNextStep = () => {
        if (groupMember.size < 2) {
            setSnackbarMessage('Group chats must have at least two members.');
            setIsSnackbarSuccessful(false);
            setOpenSnackbar(true);
            return;
        }
        setNewGroup(true);
    }

    const handleSnackbar = () => {
        setOpenSnackbar(!openSnackbar);
    }

    useEffect(() => {
        if (query === '') {
            setResultUsers([]);
            return;
        }
        const existingUserIds = new Set(resultUsers.map(user => user.id));
        const newUsers = resultUsers.slice(); // Cria uma cópia do array de usuários

        searchUsers?.content.forEach(user => {
            if (!existingUserIds.has(user.id)) {
                newUsers.push(user); // Adiciona o usuário se o ID não estiver no Set
                existingUserIds.add(user.id); // Adiciona o ID ao Set para futuras verificações
            }
        });

        setResultUsers(newUsers);
    }, [searchUsers, query])


    return (
        <div className='w-full h-full flex flex-col bg-white'>
            {!newGroup &&
                <div className='flex flex-col flex-grow overflow-hidden'>
                    <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 py-5'>
                        <BsArrowLeft onClick={handleCloseOpenCreateGroup} className='cursor-pointer text-2xl font-bold' />
                        <p className='text-xl font-semibold'>Add group members</p>
                    </div>
                    <div className='bg-white py-4 px-3'>
                        <div className='flex space-x-2 flex-wrap space-y-1'>
                            {groupMember.size > 0 && Array.from(groupMember).map((item) => <SelectedMember handleRemoveMember={() => handleRemoveMember(item)} member={item} key={item.id} />)}
                        </div>
                        <input type="text" onChange={(e) => {
                            handleSearch(e.target.value)
                            setQuery(e.target.value)
                        }} className='outline-none border-b border-[#888888] p-2 w-[93%]' placeholder='Search user' value={query} />
                    </div>

                    <div className='bg-white overflow-y-auto flex-grow'>
                        {query && resultUsers.map((item: User) =>
                            <div onClick={() => handleAddMember(item)} key={item?.id}>
                                {<ChatCard isChat={false} chatName={item.fullName ?? ''} chatImage={item.profilePicture ?? ''} />}
                            </div>)
                        }
                        {(query && searchUsers?.last === false) &&
                            <div className='flex w-full justify-center items-center'>
                                <button className='flex justify-center items-center rounded-2xl bg-green-500 p-2 text-white' onClick={handleSeeMoreClick}><BiDownArrow />See more</button>
                            </div>
                        }
                    </div>
                    <div className='bottom-10 flex items-center justify-center bg-white border py-10'>
                        <div className='bg-[#008069] rounded-full flex items-center justify-center h-16 w-16 cursor-pointer' onClick={() => { handleNextStep() }}>
                            <BsArrowRight className='text-white font-bold text-3xl' />
                        </div>
                    </div>
                </div>
            }
            {newGroup &&
                <NewGroup handleBackStep={handleNewGroup} users={Array.from(groupMember)} />
            }
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbar}>
                <Alert
                    onClose={handleSnackbar}
                    severity={`${isSnackbarSuccessful ? 'success' : 'error'}`}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CreateGroup