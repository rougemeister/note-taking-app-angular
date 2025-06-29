
// Updated app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { themeReducer } from './store/reducers/theme.reducers';
import { ThemeEffects } from './store/effects/theme.effects';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { noteReducer } from './store/reducers/reducers';
import { NoteEffects } from './store/effects/effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    
    // NgRx Store with notes feature
    provideStore({
      notes: noteReducer,  // Register the notes feature here
      theme: themeReducer
    }),
    provideEffects([NoteEffects, ThemeEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};


