import { createAction, props } from '@ngrx/store';
import { ThemeMode } from 'src/app/core/models/model';

export const setTheme = createAction('[Theme] Set Theme', props<{ theme: ThemeMode }>());
export const loadTheme = createAction('[Theme] Load Theme');
export const setThemeFromStorage = createAction('[Theme] Set Theme From Storage', props<{ theme: ThemeMode }>());
