import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private dataUrl = 'assets/data/data.json';
  private notesCache: Note[] = [];
  private dataLoaded = false;

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    if (this.dataLoaded) {
      return of(this.notesCache);
    }

    return this.http.get<{ notes: Omit<Note, 'id'>[] }>(this.dataUrl).pipe(
      map(response => {
        const notes = response.notes || [];
        const notesWithId: Note[] = notes.map(note => ({
          ...note,
          id: uuidv4()
        }));
        return notesWithId;
      }),
      tap(notes => {
        this.notesCache = notes;
        this.dataLoaded = true;
      }),
      catchError(error => {
        console.error('Error loading notes:', error);
        return throwError(() => error);
      })
    );
  }

  getNoteById(id: string): Observable<Note | undefined> {
    if (this.dataLoaded) {
      return of(this.notesCache.find(n => n.id === id));
    }

    return this.getNotes().pipe(
      map(notes => notes.find(n => n.id === id))
    );
  }

  createNote(noteData: CreateNoteRequest): Observable<Note> {
    const exists = this.notesCache.some(n => n.title === noteData.title);
    if (exists) {
      return throwError(() => new Error('A note with this title already exists.'));
    }

    const newNote: Note = {
      ...noteData,
      id: uuidv4(),
      isArchived: false,
      lastEdited: new Date().toISOString()
    };

    this.notesCache.push(newNote);
    return of(newNote);
  }

  updateNote(id: string, updateData: UpdateNoteRequest): Observable<Note> {
    const index = this.notesCache.findIndex(n => n.id === id);
    if (index === -1) {
      return throwError(() => new Error('Note not found'));
    }

    const updatedNote: Note = {
      ...this.notesCache[index],
      ...updateData,
      lastEdited: new Date().toISOString()
    };

    this.notesCache[index] = updatedNote;
    return of(updatedNote);
  }

  deleteNote(id: string): Observable<void> {
    const index = this.notesCache.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notesCache.splice(index, 1);
    }
    return of(void 0);
  }
}
