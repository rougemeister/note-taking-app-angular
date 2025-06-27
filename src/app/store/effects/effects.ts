import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NotesService } from 'src/app/core/services/notes.service';
import * as NoteActions from '../actions/actions';

@Injectable()
export class NoteEffects {
  private actions$ = inject(Actions);
  private notesService = inject(NotesService);

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
      switchMap(({ id, changes }) =>
        this.notesService.updateNote(id, changes).pipe(
          map(updatedNote => NoteActions.updateNoteSuccess({ note: updatedNote })),
          catchError(error => of(NoteActions.updateNoteFailure({ error })))
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
          catchError(error => of(NoteActions.deleteNoteFailure({ error })))
        )
      )
    )
  );
}
