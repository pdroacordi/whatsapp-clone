import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai';
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { User } from '../../Models/User';
import { createGroup } from '../../Redux/features/chat/chatSlice';
import { GroupChatRequest } from '../../Request/ChatRequests';

interface NewGroupProps {
    handleBackStep: (option : number) => void;
    users: User[];
}

const NewGroup: React.FC<NewGroupProps> = ({ handleBackStep, users }) => {
    const [isImageUploading, setIsImageUploading] = useState<boolean | false>(false);
    const [groupName, setGroupName] = useState<string | ''>('');
    const [tempPicture, setTempPicture] = useState<string>('https://www.shareicon.net/data/128x128/2016/01/13/702503_users_512x512.png');

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | ''>('');
    const [isSnackbarSuccessful, setIsSnackbarSuccessful] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('token') || '';
    const { curUser } = useSelector((state: RootState) => state.user);

    const uploadToCloudinary = (pictures: any) => {
        const data = new FormData();
        data.append("file", pictures);
        data.append("upload_preset", process.env.REACT_APP_PRESET_NAME??'' );
        data.append('cloud_name', process.env.REACT_APP_CLOUD_NAME??'');
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: data
        })
            .then((res) => res.json())
            .then((data: any) => {
                setTempPicture(data.url.toString());
                setSnackbarMessage("Profile picture updated successfully");
                setIsSnackbarSuccessful(true);
                setOpenSnackbar(true);
            })
            .catch(error => {
                setSnackbarMessage('Failed to update profile picture: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
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

    const handleCreateGroup = () => {
        const usersId: number[] = users.map(user => user.id);
        const groupChat: GroupChatRequest = { userIds: usersId, creatorUserId: curUser?.id??usersId[0], chatName: groupName, chatImage: tempPicture };
        dispatch(createGroup({ chat: groupChat, token: token }))
            .then(result => {
                if (result.payload.status === 201) {
                    setSnackbarMessage('Group created successfully');
                    setIsSnackbarSuccessful(true);
                    setOpenSnackbar(true);
                    handleBackStep(1);
                }else{
                    setSnackbarMessage('Failed to create group: ' + result.payload.message);
                    setIsSnackbarSuccessful(false);
                    setOpenSnackbar(true);
                }
            })
            .catch(error => {
                setSnackbarMessage('Failed to create group: ' + error);
                setIsSnackbarSuccessful(false);
                setOpenSnackbar(true);
            });
    }

    const handleSnackbar = () => {
        setOpenSnackbar(!openSnackbar);
    }

    return (
        <div className='w-full h-full'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 py-5'>
                <BsArrowLeft onClick={()=> {handleBackStep(0)}} className='cursor-pointer text-2xl font-bold' />
                <p className='text-xl font-semibold'>New Group</p>
            </div>
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor="imgInput" className=''>
                    <div className='w-48 h-48 overflow-hidden relative group cursor-pointer'>
                        <img className='rounded-full w-full h-full object-cover' src={tempPicture} />
                        <div className='rounded-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center group-hover:opacity-100 opacity-0 transition-opacity duration-100'>
                            <AiFillCamera className='text-5xl text-white' />
                        </div>
                    </div>
                    {isImageUploading && <CircularProgress className='absolute top-[50%] left-[50%]' />}
                </label>
                <input type="file" id='imgInput' className='hidden' onChange={(e) => handleInputFile(e.target.files)} accept='image/png, image/jpeg' />
            </div>
            <div className='w-full flex justify-between items-center py-2 px-5'>
                <input type="text" onChange={(e) => setGroupName(e.target.value)} className='w-full outline-none border-b-2 border-green-700 px-2 bg-transparent' placeholder='Group name' value={groupName} />
            </div>

            {groupName &&
                <div className='py-10 flex items-center justify-center'>
                    <Button onClick={() => {handleCreateGroup()}}>
                        <div className='bg-[#008069] rounded-full p-4'>
                            <BsCheck2 className='text-white font-bold text-3xl' />
                        </div>
                    </Button>
                </div>
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

export default NewGroup