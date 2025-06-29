import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from '../state/state';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectCurrentTheme = createSelector(
  selectThemeState,
  state => state.currentTheme
);
