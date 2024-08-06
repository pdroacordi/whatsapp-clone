import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import chatReducer from './features/chat/chatSlice';
import messageReducer from './features/message/messageSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        message: messageReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;