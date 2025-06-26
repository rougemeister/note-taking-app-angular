import { createReducer, on } from "@ngrx/store";
import { initialState } from "../state/state";
import * as NoteActions from "../actions/actions";

export const noteReducer = createReducer(
  initialState,
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
  on(NoteActions.createNoteSuccess, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note]
  })),
  on(NoteActions.updateNoteSuccess, (state, { note }) => ({
    ...state,
    notes: state.notes.map(n => n.id === note.id ? note : n)
  })),
  on(NoteActions.deleteNoteSuccess, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(n => n.id !== id)
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