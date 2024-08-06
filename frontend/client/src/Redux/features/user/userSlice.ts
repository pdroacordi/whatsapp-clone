import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../../Config/api';
import { UserRequest } from '../../../Request/UserRequest';
import { User } from '../../../Models/User';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: UserRequest, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData.user)
            });
            const data = await response.json();
            data.status = response.status;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: UserRequest, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData.user)
            });
            const data = await response.json();
            data.status = response.status;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'user/curuser',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/users/`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchForUser = createAsyncThunk(
    'user/searchuser',
    async (userData: UserRequest, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/users/search?value=${userData.query}&p=${userData.page}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${userData.token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                throw new Error(data.message || 'Could not get user.');
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateuser',
    async (userData: UserRequest, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/users/${userData.user.id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${userData.token}`
                },
                body: JSON.stringify(userData.user)
            });
            const data = await response.json();
            if (response.status !== 202) {
                throw new Error(data.message || 'Could not update user.');
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            return rejectWithValue('Failed to logout');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Get current user
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
            });
    },
});

export const saveToken = (jwt: string) => {
    localStorage.setItem('token', jwt);
}


export default userSlice.reducer;