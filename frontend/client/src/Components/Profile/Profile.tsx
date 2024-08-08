import React, { useState } from 'react'
import { BsArrowLeft, BsCheck, BsPencil } from 'react-icons/bs'
import './Profile.css';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { CLOUD_NAME, PRESET_NAME } from '../../Config/api';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/features/user/userSlice';
import { Alert, Snackbar } from '@mui/material';
import { User } from '../../Models/User';
import { AiFillCamera } from 'react-icons/ai';

interface ProfileProps {
    handleCloseOpenProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({ handleCloseOpenProfile }) => {
    const [flag, setFlag] = useState<boolean | false>(false);

    const dispatch = useDispatch<AppDispatch>();
    const { curUser } = useSelector((state: RootState) => state.user);

    const [fullName, setFullName] = useState<string | ''>(curUser?.fullName ?? '');
    const [tempPicture, setTempPicture] = useState<string>(curUser?.profilePicture ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541');

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | ''>('');
    const [isSnackbarSuccessful, setIsSnackbarSuccessful] = useState<boolean>(true);

    const token = localStorage.getItem('token') || '';

    const toggleEdit = () => {
        setFlag(!flag);
    }

    const handleCheckClick = () => {
        setFlag(false);
        if (curUser === null) return;
        const user: User = { ...curUser, fullName: fullName };
        dispatch(updateUser({ user: user, token: token }))
            .then(result => {
                if (result.payload.status === 200) {
                    setSnackbarMessage("Name updated successfully");
                    setIsSnackbarSuccessful(true);
                    setOpenSnackbar(true);
                } else {
                    setSnackbarMessage('Failed to update name: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to update name: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });

    }

    const handleSnackbar = () => {
        setOpenSnackbar(!openSnackbar);
    }

    const uploadToCloudinary = (pictures: any) => {
        const data = new FormData();
        data.append("file", pictures);
        data.append("upload_preset", PRESET_NAME);
        data.append('cloud_name', CLOUD_NAME);
        fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: data
        })
            .then((res) => res.json())
            .then((data: any) => {
                setTempPicture(data.url.toString());

                if (curUser === null) return;
                const user: User = { ...curUser, profilePicture: data.url.toString() };
                dispatch(updateUser({ user: user, token: token }))
                    .then(result => {
                        if (result.payload.status === 200) {
                            setSnackbarMessage("Profile picture updated successfully");
                            setIsSnackbarSuccessful(true);
                            setOpenSnackbar(true);
                        } else {
                            setSnackbarMessage('Failed to update profile picture: ' + result.payload.message);
                            setIsSnackbarSuccessful(false);
                            setOpenSnackbar(true);
                        }
                    })
                    .catch(error => {
                        setSnackbarMessage('Failed to update profile picture: ' + error);
                        setIsSnackbarSuccessful(false);
                        setOpenSnackbar(true);
                    });
            })
    }

    const handleInputFile = (files: FileList | null) => {
        if (files && files.length > 0) {
            uploadToCloudinary(files[0]);
        } else {
            setSnackbarMessage('No file was selected to upload.');
            setIsSnackbarSuccessful(false);
            setOpenSnackbar(true);
        }
    }

    return (
        <div className='w-full h-full bg-white'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 py-5'>
                <BsArrowLeft onClick={handleCloseOpenProfile} className='cursor-pointer text-2xl font-bold' />
                <p className='cursor-pointer font-semibold'>Profile</p>
            </div>
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor='imgInput'>
                    <div className='w-48 h-48 overflow-hidden relative group cursor-pointer'>
                        <img className='rounded-full w-full h-full object-cover' src={tempPicture} />
                        <div className='rounded-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center group-hover:opacity-100 opacity-0 transition-opacity duration-100'>
                            <AiFillCamera className='text-5xl text-white' />
                        </div>
                    </div>
                </label>
                <input type='file' id='imgInput' className='hidden' onChange={(e) => handleInputFile(e.target.files)} accept='image/png, image/jpeg' />
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
                                onKeyDown={(e) => { if (e.key === "Enter"){handleCheckClick()}}}
                            />
                            <BsCheck className='text-3xl cursor-pointer' onClick={handleCheckClick} />
                        </div>
                    </div>
                }
                <div className='py-24'>
                    <p className='font-light text-center text-xs'>Please, notice that this is not your unique username. This is the name that will be visible to all your contacts.</p>
                </div>
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

export default Profile