import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';

import api from '@/utils/api';
import { IConversation } from '@/features/conversations/models';

type FormattedConversations = {
  today: IConversation[],
  thisWeek: IConversation[],
  thisMonth: IConversation[],
  later: IConversation[]
};

type Conversations = {
  activeId: number | null;
  conversations: IConversation[];
  model: "gpt-3.5-turbo" | "gpt-4";
  isNewChat: boolean;
  formattedConversations: FormattedConversations;
};

const initialState: Conversations = {
  activeId: null,
  conversations: [],
  model: "gpt-4",
  isNewChat: false,
  formattedConversations: {
    today: [],
    thisWeek: [],
    thisMonth: [],
    later: []
  }
};

const reformat = (conversations: IConversation[]): FormattedConversations => {
  return {
    today: conversations.filter(conversation => isToday(new Date(conversation.updated_at))),
    thisWeek: conversations.filter(conversation => !isToday(new Date(conversation.updated_at)) && isThisWeek(new Date(conversation.updated_at))),
    thisMonth: conversations.filter(conversation => !isToday(new Date(conversation.updated_at)) && !isThisWeek(new Date(conversation.updated_at)) && isThisMonth(new Date(conversation.updated_at))),
    later: conversations.filter(conversation => !isToday(new Date(conversation.updated_at)) && !isThisWeek(new Date(conversation.updated_at)) && !isThisMonth(new Date(conversation.updated_at)))
  };
};

const fetch = createAsyncThunk('conversations/fetch', (abortSignal: AbortSignal | undefined) => {
  return api.get('conversations', { signal: abortSignal }).json<IConversation[]>();
});

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setModel: (state, action) => void (state.model = action.payload),
    setActiveId: (state, action: PayloadAction<number | null>) => void (state.activeId = action.payload),
    delete: (state, action: PayloadAction<number>) => {
      state.conversations = state.conversations.filter(conversation => conversation.id !== action.payload);
      state.formattedConversations = reformat(state.conversations);
    },
    rename: (state, action: PayloadAction<{ id: number, name: string }>) => {
      state.conversations = state.conversations.map(conversation => {
        if (conversation.id === action.payload.id) {
          conversation.name = action.payload.name;
        }

        return conversation;
      });

      state.formattedConversations = reformat(state.conversations);
    }
  },
  extraReducers: builder => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.conversations = action.payload;
      state.formattedConversations = reformat(state.conversations);
    });
  }
});

export const {
  setModel,
  setActiveId: setActiveConversationId,
  delete: deleteConversation,
  rename: renameConversation
} = conversationsSlice.actions;

export const fetchConversations = fetch;

export default conversationsSlice;
