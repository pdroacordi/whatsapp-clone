import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../../Config/api';
import { Chat } from '../../../Models/Chat';
import { GroupChatRequest, PrivateChatRequest } from '../../../Request/ChatRequests';
import { User } from '../../../Models/User';

interface ChatState {
    chats: Chat[];
    createdChat: Chat | null;
    createdGroup: Chat | null;
    loading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    chats: [],
    createdChat: null,
    createdGroup: null,
    loading: false,
    error: null,
};

export const createChat = createAsyncThunk(
    'chat/create',
    async ({ chat, token }: { chat: PrivateChatRequest, token: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/chats/private`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(chat)
            });
            const data = await response.json();
            data.status = response.status;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserChats = createAsyncThunk(
    'chat/getUsers',
    async ({ user, token }: { user: User, token: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/chats/user/${user.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
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

export const createGroup = createAsyncThunk(
    'group/create',
    async ({ chat, token }: { chat: GroupChatRequest, token: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/chats/group`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(chat)
            });
            const data = await response.json();
            data.status = response.status;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);



const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Create chat
            .addCase(createChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createChat.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.createdChat = action.payload;
            })
            .addCase(createChat.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Create chat by user id
            .addCase(getUserChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserChats.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(getUserChats.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Create group
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.createdGroup = action.payload;
            })
            .addCase(createGroup.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default chatSlice.reducer;