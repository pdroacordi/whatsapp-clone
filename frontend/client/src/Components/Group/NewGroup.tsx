import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'

interface NewGroupProps {
    handleBackStep: () => void;
}

const NewGroup: React.FC<NewGroupProps> = ({ handleBackStep }) => {
    const [isImageUploading, setIsImageUploading] = useState<boolean | false>(false);
    const [groupName, setGroupName] = useState<string | ''>('');

    return (
        <div className='w-full h-full'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 py-5'>
                <BsArrowLeft onClick={handleBackStep} className='cursor-pointer text-2xl font-bold' />
                <p className='text-xl font-semibold'>New Group</p>
            </div>
            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor="imgInput" className=''>
                    <img src="https://www.shareicon.net/data/128x128/2016/01/13/702503_users_512x512.png" className='cursor-pointer bg-white rounded-full p-4 hover:bg-gray-800'/>
                    {isImageUploading && <CircularProgress className='absolute top-[50%] left-[50%]' />}
                </label>
                <input type="file" id='imgInput' className='hidden' onChange={() => console.log('on change image')} />
            </div>
            <div className='w-full flex justify-between items-center py-2 px-5'>
                <input type="text" onChange={(e) => setGroupName(e.target.value)} className='w-full outline-none border-b-2 border-green-700 px-2 bg-transparent' placeholder='Group name' value={groupName} />
            </div>

            {groupName &&
                <div className='py-10 flex items-center justify-center'>
                    <Button>
                        <div className='bg-[#008069] rounded-full p-4'>
                            <BsCheck2 className='text-white font-bold text-3xl'/>
                        </div>
                    </Button>
                </div>
            }
        </div>
    )
}

export default NewGroup