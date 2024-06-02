import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import conversationsSlice from './slices/conversationsSlice';
import templatesSlice from './slices/templatesSlice';
import messagesSlice from './slices/messagesSlice';
import promptReducer from './slices/promptSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    conversations: conversationsSlice.reducer,
    templates: templatesSlice.reducer,
    messages: messagesSlice.reducer,
    prompt: promptReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
