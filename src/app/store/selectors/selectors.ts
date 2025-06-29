import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NoteState } from '../state/state';

export const selectNoteState = createFeatureSelector<NoteState>('notes');

/** Always return an array */
export const selectAllNotes = createSelector(
  selectNoteState,
  state => Array.isArray(state.notes) ? state.notes : []
);

export const selectActiveNotes = createSelector(
  selectAllNotes,
  notes => notes.filter(note => !note.isArchived)
);

export const selectArchivedNotes = createSelector(
  selectAllNotes,
  notes => notes.filter(note => note.isArchived)
);

export const selectSearchTerm = createSelector(
  selectNoteState,
  state => state.searchTerm
);

export const selectSelectedTags = createSelector(
  selectNoteState,
  state => state.selectedTags
);

export const selectFilteredNotes = createSelector(
  selectActiveNotes,
  selectSearchTerm,
  selectSelectedTags,
  (notes, searchTerm, selectedTags) => {
    return notes.filter(note => {
      const matchesSearch = !searchTerm ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => note.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }
);

export const selectAllTags = createSelector(
  selectAllNotes,
  notes => {
    const allTags = notes.flatMap(note => note.tags);
    return Array.from(new Set(allTags)).sort();
  }
);

/** 🔄 UPDATED: Lookup by ID instead of title */
export const selectNoteById = (id: string) => createSelector(
  selectAllNotes,
  notes => notes.find(note => note.id === id)
);

export const selectNotesLoading = createSelector(
  selectNoteState,
  state => state.loading
);

export const selectNotesError = createSelector(
  selectNoteState,
  state => state.error
);


export const selectNotesByTagName = (tagName: string) => createSelector(
  selectAllNotes,
  notes => notes.filter(note => note.tags.includes(tagName))
);