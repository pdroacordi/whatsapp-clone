import React, { useState } from 'react'
import { BsArrowLeft, BsCheck, BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import './Profile.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

interface ProfileProps {
    handleCloseOpenProfile : () => void;
}

const Profile: React.FC<ProfileProps> = ({handleCloseOpenProfile}) => {
    const [flag, setFlag] = useState<boolean | false>(false);
    const { curUser } = useSelector((state: RootState) => state.user);
    const [fullName, setFullName] = useState<string | ''>(curUser?.fullName??'');

    const toggleEdit = () => {
        setFlag(!flag);
    }

    const handleCheckClick = () => {
        setFlag(false);
    }

    return (
        <div className='w-full h-full bg-white'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 py-5'>
                <BsArrowLeft onClick={handleCloseOpenProfile} className='cursor-pointer text-2xl font-bold' />
                <p className='cursor-pointer font-semibold'>Profile</p>
            </div>
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor='imgInput'>
                    <img className='rounded-full w-[50vw] md:w-[15vh] cursor-pointer' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' />
                </label>
                <input type='file' id='imgInput' className='hidden' />
            </div>

            <div className='px-8'>
                <p className='py-3 font-semibold text-2xl'>Hi! My name is...</p>
                {!flag &&
                    <div className='w-full flex justify-between items-center whitespace-nowrap' onClick={() => toggleEdit()}>
                        <div className='flex-grow flex justify-between border-b border-gray-700 cursor-pointer max-w-[100%]' >
                            <p className='truncateName'>{fullName}</p>
                            <BsPencil className='' />
                        </div>
                    </div>
                }
                {flag &&
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex-grow flex justify-between border-b border-[#008069] max-w-[100%]'>
                            <input
                                placeholder='Tchicka Tchicka Slim Shady'
                                className='flex-grow bg-transparent outline-none truncateName'
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                            <BsCheck className='text-3xl cursor-pointer' onClick={handleCheckClick}/>
                        </div>
                    </div>
                }
                <div className='py-24'>
                    <p className='font-light text-center text-xs'>Please, notice that this is not your unique username. This is the name that will be visible to all your contacts.</p>
                </div>
            </div>


        </div>
    )
}

export default Profile