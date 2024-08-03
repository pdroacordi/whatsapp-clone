import React, { useEffect, useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaChevronLeft } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";
import ChatCard from '../ChatCard/ChatCard'
import { MessageCard } from '../MessageCard/MessageCard'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'
import { Button, Menu, MenuItem } from '@mui/material'
import CreateGroup from '../Group/CreateGroup'


const HomePage = () => {
    const [queries, setQueries] = useState<string | null>(null);
    const [currentChat, setCurrentChat] = useState<boolean | false>(false);
    const [content, setContent] = useState<string | "">("");
    const [isProfileOpen, setIsProfileOpen] = useState<boolean | false>(false);
    const [profileAnimation, setProfileAnimation] = useState<string | ''>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState<boolean | false>(false);
    const open = Boolean(anchorEl);


    const handleClickMenu = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSearch = (searchValue: string) => {

    }

    const handleClickOnChatCard = () => {
        setCurrentChat(true);
    }

    const handleBackFromChatClick = () => {
        setCurrentChat(false);
    }

    const handleCreateNewMessage = () => {

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
    }

    useEffect(() => {
        if (isProfileOpen) {
            setProfileAnimation('profile-animate-in');
        }
    }, [isProfileOpen]);

    return (
        <div className='flex flex-wrap min-h-screen'>
            <div className='flex bg-[#f0f2f5] h-[100%] w-full '>
                {isProfileOpen && <div className='bg-black w-screen h-screen absolute opacity-50'></div>}
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
                                    <img className='rounded-full w-10 h-10' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'></img>
                                    <p>Username</p>
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
                                            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
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
                                {queries && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) =>
                                    <div onClick={handleClickOnChatCard} className='hover:bg-gray-100'>
                                        <ChatCard isChat={true} />
                                    </div>
                                )}
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
                                    <img className='w-10 h-10 rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' />
                                    <p>Fullname</p>
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
                            {[1, 1, 1, 1, 1].map((item, i) => <MessageCard content="hi" isReqUserMessage={i % 2 !== 0} />)}
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
        </div>
    )
}

export default HomePage