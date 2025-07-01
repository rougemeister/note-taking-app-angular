import { createReducer, on } from "@ngrx/store";
import { initialState } from "../state/state";
import * as NoteActions from "../actions/actions";

export const noteReducer = createReducer(
  initialState,

  // Load
  on(NoteActions.loadNotes, state => ({
    ...state,
    loading: true
  })),
  on(NoteActions.loadNotesSuccess, (state, { notes }) => ({
    ...state,
    notes,
    loading: false,
    error: null
  })),
  on(NoteActions.loadNotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create
  on(NoteActions.createNoteSuccess, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note]
  })),
  on(NoteActions.createNoteFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Update (by id)
  on(NoteActions.updateNoteSuccess, (state, { note }) => ({
    ...state,
    notes: state.notes.map(n =>
      n.id === note.id ? note : n
    )
  })),

  on(NoteActions.updateNoteFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Delete (by id)
  on(NoteActions.deleteNoteSuccess, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(n => n.id !== id)
  })),
  on(NoteActions.deleteNoteFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Archive / Unarchive (by id)
  on(NoteActions.archiveNote, (state, { id, isArchived }) => ({
    ...state,
    notes: state.notes.map(n =>
      n.id === id ? { ...n, isArchived } : n
    )
  })),


  on(NoteActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm
  })),
  on(NoteActions.setSelectedTags, (state, { tags }) => ({
    ...state,
    selectedTags: tags
  }))
);
