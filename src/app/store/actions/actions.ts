// src/app/store/actions/note.actions.ts
import { createAction, props } from '@ngrx/store';
import { Note, CreateNoteRequest } from '../../core/models/model';

// Load Notes
export const loadNotes = createAction('[Note] Load Notes');

export const loadNotesSuccess = createAction(
  '[Note] Load Notes Success',
  props<{ notes: Note[] }>()
);

export const loadNotesFailure = createAction(
  '[Note] Load Notes Failure',
  props<{ error: any }>()
);

// Create Note
export const createNote = createAction(
  '[Note] Create Note',
  props<{ note: CreateNoteRequest }>()
);

export const createNoteSuccess = createAction(
  '[Note] Create Note Success',
  props<{ note: Note }>()
);

export const createNoteFailure = createAction(
  '[Note] Create Note Failure',
  props<{ error: any }>()
);

// Update Note (by id)
export const updateNote = createAction(
  '[Note] Update Note',
  props<{
    id: string;
    changes: Partial<Pick<Note, 'content' | 'tags' | 'isArchived'>>;
  }>()
);

export const updateNoteSuccess = createAction(
  '[Note] Update Note Success',
  props<{ note: Note }>()
);

export const updateNoteFailure = createAction(
  '[Note] Update Note Failure',
  props<{ error: any }>()
);

// Delete Note (by id)
export const deleteNote = createAction(
  '[Note] Delete Note',
  props<{ id: string }>()
);

export const deleteNoteSuccess = createAction(
  '[Note] Delete Note Success',
  props<{ id: string }>()
);

export const deleteNoteFailure = createAction(
  '[Note] Delete Note Failure',
  props<{ error: any }>()
);

// Archive / Unarchive Note
export const archiveNote = createAction(
  '[Note] Archive Note',
  props<{ id: string; isArchived: boolean }>()
);

// UI Filters
export const setSearchTerm = createAction(
  '[Note] Set Search Term',
  props<{ searchTerm: string }>()
);

export const setSelectedTags = createAction(
  '[Note] Set Selected Tags',
  props<{ tags: string[] }>()
);
