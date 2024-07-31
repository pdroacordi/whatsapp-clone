import React, { useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFilter, BsThreeDotsVertical } from 'react-icons/bs'
import { FaChevronLeft } from "react-icons/fa6";
import ChatCard from './ChatCard/ChatCard'


const HomePage = () => {
    const [queries, setQueries] = useState<string | null>(null);
    const [currentChat, setCurrentChat] = useState<boolean | false>(false);

    const handleSearch = (searchValue: string) => {

    }

    const handleClickOnChatCard = () => {
        setCurrentChat(true);
    }

    const handleBackFromChatClick = () => {
        setCurrentChat(false);
    }

    return (
        <div className='flex flex-wrap'>
            <div className=' w-full py-14 bg-[#00a884] '></div>
            <div className='flex bg-[#f0f2f5] h-[90%] -mt-14  w-full '>
                <div className={`left ${currentChat ? 'hidden md:block' : 'block'} w-[100%] md:w-[30%] bg-[#e8e9ec] h-full`}>
                    <div className='w-full'>
                        <div className='flex justify-between items-center p-3'>
                            <div className='flex items-center space-x-3'>
                                <img className='rounded-full w-10 h-10 cursor-pointer' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'></img>
                                <p>Username</p>
                            </div>
                            <div className='space-x-3 text-2xl flex'>
                                <TbCircleDashed className='hidden md:block' />
                                <BiCommentDetail className='hidden md:block' />
                            </div>
                        </div>
                        <div className='relative flex justify-center items-center bg-white py-4 px-3'>
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
                    </div>
                    <div className='bg-white overflow-y-scroll h-[76.8vh]'>
                        {queries && [1, 2, 3, 4].map((item) =>
                            <div onClick={handleClickOnChatCard}>

                                <ChatCard />
                            </div>
                        )}
                    </div>
                    <div>

                    </div>
                </div>
                {!currentChat && <div className='hidden md:flex w-[70%] flex-col items-center justify-center h-full'>
                    <div className='max-w-[70%] text-center'>
                        <img src='https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png'></img>
                        <h1 className='text-4xl text-gray-600'>WhatsApp Web</h1>
                    </div>
                </div>}

                {/*  Chat */}

                {currentChat &&
                    <div className='header w-[100%] md:w-[70%] bg-[#f0f2f5]'>
                        <div >
                            <div className='flex justify-between'>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <FaChevronLeft className='cursor-pointer block  md:hidden' onClick={handleBackFromChatClick}/>
                                    <img className='w-10 h-10 rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' />
                                    <p>Fullname</p>
                                </div>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <AiOutlineSearch />
                                    <BsThreeDotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default HomePage