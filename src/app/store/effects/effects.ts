// src/app/store/effects/note.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NotesService } from '../../core/services/firebase';
import * as NoteActions from '../actions/actions';

@Injectable()
export class NoteEffects {
private actions$ = inject(Actions);
  private notesService = inject(NotesService);

  constructor(
    
  ) {}

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.loadNotes),
      switchMap(() =>
        this.notesService.getNotes().pipe(
          map(notes => NoteActions.loadNotesSuccess({ notes })),
          catchError(error => of(NoteActions.loadNotesFailure({ error })))
        )
      )
    )
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.createNote),
      switchMap(({ note }) =>
        this.notesService.createNote(note).pipe(
          map(createdNote => NoteActions.createNoteSuccess({ note: createdNote })),
          catchError(error => of(NoteActions.createNoteFailure({ error })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.updateNote),
      switchMap(({ note }) =>
        this.notesService.updateNote(note).pipe(
          map(updatedNote => NoteActions.updateNoteSuccess({ note: updatedNote })),
          catchError(error => of(NoteActions.loadNotesFailure({ error })))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.deleteNote),
      switchMap(({ id }) =>
        this.notesService.deleteNote(id).pipe(
          map(() => NoteActions.deleteNoteSuccess({ id })),
          catchError(error => of(NoteActions.loadNotesFailure({ error })))
        )
      )
    )
  );

  archiveNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.archiveNote),
      switchMap(({ id, isArchived }) =>
        this.notesService.updateNote({ id, isArchived }).pipe(
          map(updatedNote => NoteActions.updateNoteSuccess({ note: updatedNote })),
          catchError(error => of(NoteActions.loadNotesFailure({ error })))
        )
      )
    )
  );
}