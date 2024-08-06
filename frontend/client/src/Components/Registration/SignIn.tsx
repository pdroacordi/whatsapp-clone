import { Alert, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface AuthObject {
    email: string;
    password: string;
}

const SignIn = () => {
    const [inputData, setInputData] = useState<AuthObject | null>({email: '', password: ''});
    const [openSnackbar, setOpenSnackbar] = useState<boolean | false>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | ''>('');
    const [isSnackbarSuccessful, setIsSnackbarSuccessful] = useState<boolean | true>(true);
    const navigate = useNavigate();

    const handleSubmit = (e : any) => {
        e.preventDefault();
        setIsSnackbarSuccessful(true);
        setSnackbarMessage('Logged in succesfully');
        setOpenSnackbar(true);
    }

    const handleChange = () => {

    }

    const handleSnackbar = () => {
        setOpenSnackbar(!openSnackbar);
    }

    return (
        <div>
            <div className='flex justify-center h-screen items-center'>
                <div className='w-[90%] md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[20%] p-10 shadow-md bg-white rounded-xl'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p className='mb-2'>Email</p>
                            <input type="text"
                                className='p-2 outline outline-gray-200 focus:outline-green-600 w-full rounded-md border'
                                placeholder='Enter your best email'
                                onChange={handleChange}
                                value={inputData?.email}
                            />
                        </div>
                        <div>
                            <p className='mb-2'>Password</p>
                            <input type="text"
                                className='p-2 outline outline-gray-200 focus:outline-green-600 w-full rounded-md border'
                                placeholder='Enter your password'
                                onChange={handleChange}
                                value={inputData?.password}
                            />
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='w-full bg-[#008069] hover:bg-[#008055] text-white py-2 rounded-md hover:-translate-y-1 transition ease-in'>
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className='flex space-x-3 items-center mt-5 justify-center'>
                        <p
                            className='text-center text-gray-300 hover:underline cursor-pointer'
                            onClick={() => navigate('/signup')}
                        >
                            Don't have an account yet? Click here
                        </p>
                    </div>
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

export default SignIn