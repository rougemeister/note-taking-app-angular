import { createReducer, on } from '@ngrx/store';
import { setTheme, setThemeFromStorage } from '../actions/theme.actions';
import { ThemeMode } from 'src/app/core/models/model';

export interface ThemeState {
  currentTheme: ThemeMode;
}

export const initialThemeState: ThemeState = {
  currentTheme: 'system'
};

export const themeReducer = createReducer(
  initialThemeState,
  on(setTheme, (state, { theme }) => ({ ...state, currentTheme: theme })),
  on(setThemeFromStorage, (state, { theme }) => ({ ...state, currentTheme: theme }))
);
