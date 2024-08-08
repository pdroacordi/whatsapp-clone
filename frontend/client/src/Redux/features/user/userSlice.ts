import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../../Config/api';
import { User } from '../../../Models/User';
import { UserPageable } from '../../../Models/Pageable';

interface UserState {
    curUser: User | null;
    searchUsers: UserPageable | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    curUser: null,
    searchUsers: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (user : User, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
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
    async (user : User, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
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
            data.status = response.status;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchForUser = createAsyncThunk(
    'user/searchuser',
    async ({query, page, token}:{query:string, page:number, token:string}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/users/search?value=${query}&p=${page}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            data.status = response.status;
            console.log(data)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateuser',
    async ({user, token}:{user: User, token: string}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            data.status = response.status;
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
                state.curUser = action.payload;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.curUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
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
                state.curUser = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Search for user
            .addCase(searchForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.searchUsers = null;
            })
            .addCase(searchForUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.searchUsers = action.payload;
            })
            .addCase(searchForUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
                state.searchUsers = null;
            })
            //Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.curUser = action.payload;
            })
            .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Logout
            .addCase(logout.fulfilled, (state) => {
                state.curUser = null;
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