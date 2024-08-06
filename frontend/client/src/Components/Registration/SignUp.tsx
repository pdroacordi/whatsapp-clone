import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserRequest } from '../../Request/UserRequest';
import { getCurrentUser, registerUser, saveToken } from '../../Redux/features/user/userSlice';
import { AppDispatch, RootState } from '../../Redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

interface RegistrationObject {
    email: string;
    password: string;
    fullName: string;
}

const SignUp = () => {
    const [inputData, setInputData] = useState<RegistrationObject>({ email: '', password: '', fullName: '' });
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | ''>('');
    const [isSnackbarSuccessful, setIsSnackbarSuccessful] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { curUser } = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem('token');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const actionResult = await dispatch(registerUser(getUserRequestFromInputData()));
            const response = unwrapResult(actionResult);
            if (response.status == 201) {
                setIsSnackbarSuccessful(true);
                setSnackbarMessage('Account created successfully');
                saveToken(response.token);
            } else {
                setIsSnackbarSuccessful(false);
                setSnackbarMessage(`Error: ${response.message}` || 'Failed to create account');
            }
        } catch (error: any) {
            setIsSnackbarSuccessful(false);
            setSnackbarMessage(error.message || 'Failed to create account');
        } finally {
            setOpenSnackbar(true);
        }

    }

    const handleSnackbar = () => {
        setOpenSnackbar(!openSnackbar);
    }

    function getUserRequestFromInputData(): UserRequest {
        let userReq: UserRequest = { user: { email: inputData.email, fullName: inputData.fullName, password: inputData.password } }
        return userReq;
    }

    useEffect(() => {
        if (token) dispatch(getCurrentUser(token))
    }, [token])

    useEffect(() => {
        if (curUser?.fullName) {
            navigate('/');
        }
    }, [curUser]);

    return (
        <div>
            <div>
                <div className='flex flex-col justify-center h-screen items-center'>
                    <div className='w-[90%] md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[20%] p-10 shadow-md bg-white rounded-xl'>
                        <form className='space-y-5' onSubmit={handleSubmit}>
                            <div>
                                <p className='mb-2'>Name</p>
                                <input
                                    type="text"
                                    className='p-2 outline outline-gray-200 focus:outline-green-600 w-full rounded-md border'
                                    placeholder='Enter full name'
                                    name='fullName'
                                    onChange={(e) => handleChange(e)}
                                    value={inputData?.fullName}
                                />
                            </div>
                            <div>
                                <p className='mb-2'>Email</p>
                                <input
                                    type="text"
                                    className='p-2 outline outline-gray-200 focus:outline-green-600 w-full rounded-md border'
                                    placeholder='Enter email'
                                    name='email'
                                    onChange={(e) => handleChange(e)}
                                    value={inputData?.email}
                                />
                            </div>
                            <div>
                                <p className='mb-2'>Password</p>
                                <input
                                    type="password"
                                    className='p-2 outline outline-gray-200 focus:outline-green-600 w-full rounded-md border'
                                    placeholder='Enter password'
                                    name='password'
                                    onChange={(e) => handleChange(e)}
                                    value={inputData?.password}
                                />
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className='w-full bg-[#008069] hover:bg-[#008055] text-white py-2 rounded-md hover:-translate-y-1 transition ease-in'>
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <div className='flex space-x-3 items-center mt-5 justify-center'>
                            <p
                                className='text-center text-gray-300 hover:underline cursor-pointer'
                                onClick={() => navigate('/signin')}
                            >
                                Already have an account? Click here
                            </p>
                        </div>
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

export default SignUp