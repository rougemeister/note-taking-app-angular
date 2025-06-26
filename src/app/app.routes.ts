import { Routes } from '@angular/router';
import { CreateNote } from './features/notes/create-note/create-note';
import { Dashboard } from './features/notes/dashboard/dashboard';

export const routes: Routes = [
    {   
        path: '',
        component: Dashboard
    },
    {
        path:'create',
        component: CreateNote
    }
];
