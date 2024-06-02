import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

type TabId = 'system' | 'user' | 'favorites';

export interface Template {
  id: number;
  name: string;
  prompt: string;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
}

interface Templates {
  activeTabId: TabId;
  activeTemplateId: number | null;
  activeTemplate: Template | null;
  system: Template[],
  user: Template[],
  favorites: Template[]
}

const initialState: Templates = {
  activeTabId: 'system',
  activeTemplateId: null,
  activeTemplate: null,
  system: [],
  user: [],
  favorites: []
};

const fetch = createAsyncThunk('templates/fetch', (abortSignal: AbortSignal | undefined) => {
  return api.get('templates', { signal: abortSignal }).json<{
    system: Template[],
    user: Template[]
  }>();
});

const saveFavorites = (templates: Template[]) => {
  const templatesJson: { favorites: Template[] } = { favorites: [] };
  templatesJson.favorites = templates;
  localStorage.setItem('templates', JSON.stringify(templatesJson));
};

const fetchFavorites = (): Template[] => {
  if (localStorage.getItem('templates') === null) {
    return [];
  }

  try {
    const templatesJson = JSON.parse(localStorage.getItem('templates')!) as { favorites: Template[] };
    return templatesJson.favorites;
  } catch (error) {
    console.error(error);
  }

  return [];
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setActiveTabId: (state, action: PayloadAction<TabId>) => void (state.activeTabId = action.payload),
    setActiveTemplateId: (state, action: PayloadAction<number | null>) => void (state.activeTemplateId = action.payload),
    findTemplate: (state, action) => {
      const template = state.user.find(template => template.id === action.payload);
      if (template) {
        state.activeTemplate = template
      } else {
        state.activeTemplate = null
      }
    },
    addFavorite: (state, action: PayloadAction<number>) => {
      const template = state.system.concat(state.user).find(template => template.id === action.payload);
      if (template !== undefined) {
        state.favorites.push(template);
        saveFavorites(state.favorites);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const template = state.system.concat(state.user).find(template => template.id === action.payload);
      if (template !== undefined) {
        state.favorites = state.favorites.filter(template => template.id !== action.payload);
        saveFavorites(state.favorites);
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.system = action.payload.system;
      state.user = action.payload.user;


      const favorites = fetchFavorites();
      const templates = state.system.concat(state.user);

      for (const template of templates) {
        const favoriteTemplate = favorites.find(({ id }) => template.id === id);

        if (favoriteTemplate !== undefined) {
          state.favorites.push(favoriteTemplate);
        }
      }
    });
  }
});

export const fetchTemplates = fetch;

export const {
  setActiveTabId: setActiveTemplatesTabId,
  setActiveTemplateId,
  findTemplate,
  addFavorite: addFavoriteTemplate,
  removeFavorite: removeFavoriteTemplate
} = templatesSlice.actions;

export default templatesSlice;
