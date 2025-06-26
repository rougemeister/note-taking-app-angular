// src/app/core/services/notes.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, combineLatest, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  getNotes(): Observable<Note[]> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (!user) return [];
        return this.firestore
          .collection<Note>('notes', ref => ref.where('userId', '==', user.uid))
          .valueChanges();
      })
    );
  }

  createNote(noteData: CreateNoteRequest): Observable<Note> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');
        
        const note: Note = {
          id: uuidv4(),
          ...noteData,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.uid
        };

        return this.firestore
          .collection('notes')
          .doc(note.id)
          .set(note)
          .then(() => note);
      })
    );
  }

  updateNote(noteData: UpdateNoteRequest): Observable<Note> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (!user) throw new Error('User not authenticated');
        
        const updateData = {
          ...noteData,
          updatedAt: new Date()
        };

        return this.firestore
          .collection('notes')
          .doc(noteData.id)
          .update(updateData)
          .then(() => {
            return this.firestore
              .collection('notes')
              .doc(noteData.id)
              .get()
              .toPromise()
              .then(doc => doc?.data() as Note);
          });
      })
    );
  }

  deleteNote(id: string): Observable<void> {
    return from(
      this.firestore
        .collection('notes')
        .doc(id)
        .delete()
    );
  }
}