import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import { IFile, IMessage, IMessageResponse, ITemplate } from '@/features/chat/models/api';

type Messages = {
  messages: IMessage[];
  plugMessages: IMessage[]
  isLoading: boolean;
  isSending: boolean;
};

const initialState: Messages = {
  messages: [],
  plugMessages: [],
  isLoading: false,
  isSending: false
};

const fetch = createAsyncThunk<IMessage[], { conversationId: number, abortSignal?: AbortSignal }>('messages/fetch', ({ conversationId, abortSignal }) => {
  return api.get('messages', {
    signal: abortSignal,
    searchParams: new URLSearchParams({ conversationId: conversationId.toString() })
  }).json<IMessage[]>();
});

const send = createAsyncThunk<IMessageResponse, { conversationId: number, prompt: string, text1?: string, text2?: string, text3?: string, text4?: string, text5?: string, template?: ITemplate, file: File | undefined, abortSignal?: AbortSignal }>('messages/add', async ({ conversationId, prompt, file, abortSignal, text1, text2, text3, text4, text5, template }) => {
  let messageResponse: IMessageResponse = { data: '' };

  try {
    let fileIdResponse: string | undefined = undefined;

    if (file !== undefined) {
      const formData = new FormData();
      formData.append('document', file);
      fileIdResponse = (await api.post('files', { body: formData, signal: abortSignal }).json<IFile>()).file_id;
    }

    messageResponse = await api.post('messages', {
      signal: abortSignal, json: {
        conversationId,
        content: prompt,
        files: fileIdResponse,
        text1,
        text2,
        text3,
        text4,
        text5,
        template,
      }
    }).json<IMessageResponse>();
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }

  return messageResponse;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearMessages: (state) => void (state.messages = []),
    setIsSending: (state, action: PayloadAction<boolean>) => void (state.isSending = action.payload),
    addMessage: (state, action) =>  {
      state.plugMessages = [action.payload, {role: 'assistant', content: 'loading'}]
    },
    setMessagesLoading: (state, action) =>  {
      state.isLoading = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetch.pending, state => {
      state.isLoading = true;
      state.messages = [];
    });
    builder.addCase(fetch.fulfilled, (state, action) => {
      console.log(action.payload)
      state.messages = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetch.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(send.pending, state => {
      state.isSending = true;
    });
    builder.addCase(send.fulfilled, (state, action) => {
      state.isSending = false;
      state.messages.push(
        { role: 'user', content: action.meta.arg.prompt, files: action.payload.files },
        { role: 'assistant', content: action.payload.data, files: action.payload.files },
      );
      state.plugMessages = []
    });
    builder.addCase(send.rejected, state => {
      state.isSending = false;
    });
  }
});

export const fetchMessages = fetch;
export const sendMessage = send;

export const { setIsSending: setMessagesIsSending, addMessage, clearMessages, setMessagesLoading } = messagesSlice.actions;

export default messagesSlice;
