import { Routes } from '@angular/router';
import { CreateNote } from './features/notes/create-note/create-note';
import { Dashboard } from './features/notes/dashboard/dashboard';
import { NoteDetails } from './features/notes/note-details/note-details';

export const routes: Routes = [
    {   
        path: '',
        component: Dashboard
    },
    {
        path:'create',
        component: CreateNote
    },
    {
        path: 'note/:id',
        component: NoteDetails
    }
];
