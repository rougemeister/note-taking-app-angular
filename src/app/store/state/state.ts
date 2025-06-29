import { Note } from "../../core/models/model";
import { ThemeMode } from "../../core/models/model";
export interface NoteState {
  notes: Note[];
  loading: boolean;
  error: any;
  searchTerm: string;
  selectedTags: string[];
}


export const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedTags: []
};




//Theme

export interface ThemeState {
  currentTheme: ThemeMode;
}

export const initialThemeState: ThemeState = {
  currentTheme: 'system',
};
