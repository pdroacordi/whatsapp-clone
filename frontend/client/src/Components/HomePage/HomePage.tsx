import React, { useEffect, useState } from 'react'
import { BiCommentDetail, BiDownArrow, BiPlus } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaChevronLeft } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";
import ChatCard from '../ChatCard/ChatCard'
import { MessageCard } from '../MessageCard/MessageCard'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'
import { Alert, Menu, MenuItem, Snackbar } from '@mui/material'
import CreateGroup from '../Group/CreateGroup'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, logout, searchForUser } from '../../Redux/features/user/userSlice'
import { AppDispatch, RootState } from '../../Redux/store'
import { createChat, getUserChats } from '../../Redux/features/chat/chatSlice'
import { PrivateChatRequest } from '../../Request/ChatRequests'
import { Chat } from '../../Models/Chat'
import { createMessage, getAllMessagesFromChat } from '../../Redux/features/message/messageSlice';
import { MessageRequest } from '../../Request/MessageRequest';


const HomePage = () => {
    const [queries, setQueries] = useState<string | null>(null);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [content, setContent] = useState<string | "">("");
    const [isProfileOpen, setIsProfileOpen] = useState<boolean | false>(false);
    const [profileAnimation, setProfileAnimation] = useState<string | ''>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState<boolean | false>(false);

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | ''>('');
    const [isSnackbarSuccessful, setIsSnackbarSuccessful] = useState<boolean>(true);

    const { curUser, searchUsers } = useSelector((state: RootState) => state.user);
    const { chats } = useSelector((state: RootState) => state.chat);
    const { messages } = useSelector((state: RootState) => state.message);


    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('token') || '';


    const handleClickMenu = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSearch = (searchValue: string) => {
        if (searchValue === '')
            return;
        if (token !== null)
            dispatch(searchForUser({ query: searchValue, page: 0, token: token }))
    }

    const handleSeeMoreClick = () => {
        if (queries === '')
            return;
        if (token !== null && queries !== null) {
            const page = searchUsers?.number ?? 0 + 1
            dispatch(searchForUser({ query: queries, page: page, token: token }))
        }
    }

    const handleClickOnChatCard = (userId: number) => {
        const chatRequest: PrivateChatRequest = { reqUserId: curUser?.id, recUserId: userId };
        dispatch(createChat({ chat: chatRequest, token: token }))
            .then(result => {
                if (result.payload.status === 201) {
                    setQueries('');
                    setCurrentChat(result.payload);
                } else {
                    setSnackbarMessage('Failed to create chat: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to create chat: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    };

    const handleCurrentChat = (chat: Chat) => {
        setCurrentChat(chat);
    }

    const handleBackFromChatClick = () => {
        setCurrentChat(null);
    }

    const handleCreateNewMessage = () => {
        const message: MessageRequest = { userId: curUser?.id ?? 0, chatId: currentChat?.id ?? 0, content: content }
        dispatch(createMessage({ message, token }))
            .then(result => {
                if (result.payload.status !== 200) {
                    setSnackbarMessage('Failed to create chat: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                    return;
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to create chat: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    }


    const handleCloseOpenProfile = () => {
        if (isProfileOpen) {
            setProfileAnimation('profile-animate-out');
            setTimeout(() => {
                setIsProfileOpen(false);
            }, 200);
        } else {
            setProfileAnimation('profile-animate-in');
            setIsProfileOpen(true);
        }
    }

    const handleCreateGroup = () => {
        if (isCreateGroupOpen) {
            setProfileAnimation('profile-animate-out');
            setTimeout(() => {
                setIsCreateGroupOpen(false);
            }, 200);
        } else {
            setProfileAnimation('profile-animate-in');
            setIsCreateGroupOpen(true);
        }
        handleCloseMenu();
    }

    const handleLogout = () => {
        handleCloseMenu();
        dispatch(logout());
    }

    const handleSnackbar = () => {
        setOpenSnackbar(!openSnackbar);
    }

    useEffect(() => {
        if (isProfileOpen) {
            setProfileAnimation('profile-animate-in');
        }
    }, [isProfileOpen]);

    useEffect(() => {
        if (curUser == null) {
            navigate('/signin');
        }
    }, [curUser]);

    useEffect(() => {
        dispatch(getCurrentUser(token))
            .then(result => {
                if (result.payload.status !== 200) {
                    setSnackbarMessage('Failed to get token: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                    return;
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to get token: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    }, [token]);

    useEffect(() => {
        if (curUser === null) return

        dispatch(getUserChats({ user: curUser, token: token }))
            .then(result => {
                if (result.payload.status !== 200) {
                    setSnackbarMessage('Failed to get user: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                    return;
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to get user: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    }, [])

    useEffect(() => {
        if (currentChat === null) return

        dispatch(getAllMessagesFromChat({ chat: currentChat, token: token }))
            .then(result => {
                if (result.payload.status !== 200) {
                    setSnackbarMessage('Failed to get messages: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                    return;
                }
                console.log(result.payload);
            })
            .catch(error => {
                setSnackbarMessage('Failed to get messages: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    }, [currentChat])

    return (
        <div className='flex flex-wrap min-h-screen'>
            <div className='flex bg-[#f0f2f5] h-[100%] w-full '>
                {(isProfileOpen || isCreateGroupOpen) && <div className='bg-black w-screen h-screen absolute opacity-50'></div>}
                <div className={`left flex-col ${currentChat ? 'hidden md:flex' : 'flex'} w-[100%] md:w-[30%] bg-[#e8e9ec] h-screen`}>
                    <div className='w-full flex flex-col h-full overflow-hidden'>

                        {/* profile */}
                        {isProfileOpen &&
                            <div className={`w-full h-full ${profileAnimation} z-10 shadow-2xl`}>
                                <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
                            </div>
                        }
                        {/** create group */}
                        {isCreateGroupOpen &&
                            <div className={`w-full h-full ${profileAnimation} z-10 shadow-2xl `}>
                                <CreateGroup handleCloseOpenCreateGroup={handleCreateGroup} />
                            </div>
                        }
                        {/* home */}
                        {!isProfileOpen && !isCreateGroupOpen && <div className='flex flex-col flex-1 '>
                            <div className='flex justify-between items-center p-3'>
                                <div onClick={handleCloseOpenProfile} className='flex items-center space-x-3 cursor-pointer'>
                                    <img className='rounded-full w-10 h-10' src={ curUser?.profilePicture ? curUser.profilePicture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}></img>
                                    <p>{curUser?.fullName}</p>
                                </div>
                                <div className='space-x-3 text-2xl flex items-center'>
                                    <BiCommentDetail className='hidden md:block' />
                                    <div>
                                        <BsThreeDotsVertical className='cursor-pointer'
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClickMenu} />
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleCloseMenu}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleCreateGroup}>Create group chat</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center bg-white py-4 px-3'>
                                <div className='flex items-center w-full bg-slate-200 rounded-md'>
                                    <AiOutlineSearch className='ml-3' />
                                    <input className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-2 md:pl-4 lg:pl-6 py-2'
                                        type="text"
                                        placeholder='Search or start new chat'
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setQueries(newValue);
                                            handleSearch(newValue);
                                        }}
                                        value={queries || ''}
                                    />
                                </div>
                                <div>
                                    <BsFilter className='text-2xl ml-4 lg:text-3xl hidden md:block' />
                                </div>
                            </div>

                            <div className='chats flex-1 bg-white overflow-y-auto max-h-screen'>
                                {(!queries && chats.length > 0) && chats?.map((item) =>
                                    <div key={item.id} className='hover:bg-gray-100' onClick={() => handleCurrentChat(item)}>
                                        {
                                            item.isGroupChat
                                                ?
                                                <ChatCard
                                                    isChat={true}
                                                    chatName={item.chatName ?? ''}
                                                    chatImage={item.chatImage ?? ''}

                                                />
                                                :
                                                <ChatCard
                                                    isChat={true}
                                                    chatName={(curUser?.id === item.users[0].id ? item.users[1].fullName : item.users[0].fullName) ?? ''}
                                                    chatImage={(curUser?.id === item.users[0].id ? item.users[1].profilePicture : item.users[0].profilePicture) ?? ''}
                                                />
                                        }
                                    </div>
                                )}
                                {queries && searchUsers?.content.map((item) =>
                                    <div key={item.id} onClick={() => handleClickOnChatCard(item.id)} className='hover:bg-gray-100'>
                                        <ChatCard isChat={false} chatName={item.fullName ?? ''} chatImage={''} />
                                    </div>
                                )}
                                {(queries && searchUsers?.last === false) &&
                                    <div className='flex w-full justify-center items-center'>
                                        <button className='flex justify-center items-center rounded-2xl bg-green-500 p-2 text-white' onClick={handleSeeMoreClick}><BiDownArrow />See more</button>
                                    </div>
                                }
                            </div>
                        </div>}
                    </div>
                </div>
                {!currentChat && <div className='hidden md:flex w-[70%] flex-col items-center justify-center h-screen'>
                    <div className='max-w-[70%] text-center'>
                        <img src='https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png'></img>
                        <h1 className='text-4xl text-gray-600'>WhatsApp Web</h1>
                    </div>
                </div>}

                {/*  Chat */}
                {currentChat && <div className='chatContainer flex flex-col h-screen w-[100%] md:w-[70%] bg-[#f0f2f5]'>
                    <div className='w-[100%] bg-[#d8d9db]'>
                        <div >
                            <div className='flex justify-between'>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <FaChevronLeft className='cursor-pointer block  md:hidden' onClick={handleBackFromChatClick} />

                                    {
                                        currentChat.isGroupChat
                                            ?
                                            <img className='w-10 h-10 rounded-full' src={currentChat.chatImage || 'https://www.shareicon.net/data/128x128/2016/01/13/702503_users_512x512.png'} />
                                            :
                                            <img className='w-10 h-10 rounded-full' src={(currentChat.users[0].id === curUser?.id
                                                ? currentChat.users[1].profilePicture
                                                : currentChat.users[0].profilePicture) ??
                                                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                                            />
                                    }
                                    {
                                        currentChat.isGroupChat
                                            ?
                                            <p>{currentChat.chatName}</p>
                                            :
                                            <p>{currentChat.users[0].id === curUser?.id
                                                ? currentChat.users[1].fullName
                                                : currentChat.users[0].fullName}
                                            </p>
                                    }
                                </div>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <AiOutlineSearch />
                                    <BsThreeDotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 px-10 h-[84%] overflow-y-scroll'>
                        <div className='space-y-1 flex flex-col justify-center  py-2'>
                            {messages.map((item) => <MessageCard key={item.id} content={item.content??''} isReqUserMessage={item.user?.id === curUser?.id} />)}
                        </div>
                    </div>

                    <div className='footer bg-[#f0f2f5] flex items-center space-x-1 p-3'>
                        <div className='flex space-x-1'>
                            <BsEmojiSmile className='cursor-pointer text-2xl' />
                            <ImAttachment className='cursor-pointer text-2xl' />
                        </div>
                        <input className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]' type='text' onChange={(e) => setContent(e.target.value)} placeholder='type message' value={content} onKeyDown={(e) => { if (e.key === "Enter") { handleCreateNewMessage(); setContent("") } }} />
                        <BsMicFill className='text-2xl' />
                    </div>
                </div>}
            </div>
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

export default HomePage