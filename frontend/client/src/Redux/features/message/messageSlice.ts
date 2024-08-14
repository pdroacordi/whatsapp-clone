import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../../../Config/api';
import { Message } from '../../../Models/Message';
import { MessageRequest } from '../../../Request/MessageRequest';
import { Chat } from '../../../Models/Chat';

interface MessageState {
    newMessage: Message | null;
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    newMessage: null,
    messages: [],
    loading: false,
    error: null,
};

export const createMessage = createAsyncThunk(
    'message/create',
    async ({message, token}:{message: MessageRequest, token: string}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/messages/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(message)
            });
            const data = await response.json();
            data.status = response.status;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllMessagesFromChat = createAsyncThunk(
    'message/getall',
    async ({chat, token}:{chat: Chat, token: string}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_API_URL}/api/messages/chats/${chat.id}`, {
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


const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            //Create message
            .addCase(createMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMessage.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.newMessage = action.payload;
            })
            .addCase(createMessage.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Get all messages from chat
            .addCase(getAllMessagesFromChat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMessagesFromChat.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getAllMessagesFromChat.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default messageSlice.reducer;