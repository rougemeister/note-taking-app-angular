// src/app/core/services/notes.service.ts
import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  getDoc
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class 
NotesService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private user$ = user(this.auth);

  getNotes(): Observable<Note[]> {
    return this.user$.pipe(
      switchMap(currentUser => {
        if (!currentUser) return of([]);
        
        const notesRef = collection(this.firestore, 'notes');
        const userNotesQuery = query(notesRef, where('userId', '==', currentUser.uid));
        
        return collectionData(userNotesQuery, { idField: 'id' }) as Observable<Note[]>;
      })
    );
  }

  createNote(noteData: CreateNoteRequest): Observable<Note> {
    return this.user$.pipe(
      switchMap(currentUser => {
        if (!currentUser) throw new Error('User not authenticated');
        
        const note: Omit<Note, 'id'> = {
          ...noteData,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: currentUser.uid
        };

        const notesRef = collection(this.firestore, 'notes');
        
        return from(addDoc(notesRef, note)).pipe(
          map(docRef => ({
            id: docRef.id,
            ...note
          } as Note))
        );
      })
    );
  }

  updateNote(noteData: UpdateNoteRequest): Observable<Note> {
    return this.user$.pipe(
      switchMap(currentUser => {
        if (!currentUser) throw new Error('User not authenticated');
        
        const { id, ...updateData } = noteData;
        const updatedData = {
          ...updateData,
          updatedAt: new Date()
        };

        const noteRef = doc(this.firestore, `notes/${id}`);
        
        return from(updateDoc(noteRef, updatedData)).pipe(
          switchMap(() => from(getDoc(noteRef))),
          map(docSnap => {
            if (docSnap.exists()) {
              return { id: docSnap.id, ...docSnap.data() } as Note;
            }
            throw new Error('Note not found after update');
          })
        );
      })
    );
  }

  deleteNote(id: string): Observable<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    return from(deleteDoc(noteRef));
  }
}