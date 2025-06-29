import { Routes } from '@angular/router';
import { CreateNote } from './features/notes/create-note/create-note';
import { Dashboard } from './features/notes/dashboard/dashboard';
import { NoteDetails } from './features/notes/note-details/note-details';
import { Archived } from './features/notes/archived/archived';
import { TagsComponent } from './features/notes/tags/tags.component';
import { SelectedTagsDetailsComponent } from './features/notes/selected-tags-details/selected-tags-details.component';
import { SearchComponent } from './features/shared/nav/search/search.component';
import { SearchDetailPageComponent } from './features/notes/search-detail-page/search-detail-page.component';

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
    },
    {
        path: 'archived',
        component: Archived
    }, 
    {
        path: 'tags',
        component: TagsComponent
    },
    {
        path: 'tags/:tag',
        component: SelectedTagsDetailsComponent
    },
    {
        path:'search',
        component: SearchDetailPageComponent
    }
    
];
