import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { setTheme, loadTheme, setThemeFromStorage } from '../actions/theme.actions';
import { ThemeMode } from 'src/app/core/models/model';

const THEME_STORAGE_KEY = 'user-theme';

export class ThemeEffects {
  private actions$ = inject(Actions);

  setTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setTheme),
        tap(({ theme }) => {
          // 1. Save to localStorage
          localStorage.setItem(THEME_STORAGE_KEY, theme);

          // 2. Apply the theme to body
          document.body.classList.remove('theme-light', 'theme-dark', 'theme-system');
          document.body.classList.add(`theme-${theme}`);
        })
      ),
    { dispatch: false }
  );

  loadTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTheme),
      map(() => {
        const theme = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) || 'system';
        return setThemeFromStorage({ theme });
      })
    )
  );
}
