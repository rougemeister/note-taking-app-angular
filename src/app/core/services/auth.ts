// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: AngularFireAuth) {
    this.user$ = this.auth.authState.pipe(
      map(user => user ? {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || undefined
      } : null)
    );
  }

  login(email: string, password: string): Observable<User> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      map(credential => ({
        uid: credential.user!.uid,
        email: credential.user!.email!,
        displayName: credential.user!.displayName || undefined
      }))
    );
  }

  register(email: string, password: string): Observable<User> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      map(credential => ({
        uid: credential.user!.uid,
        email: credential.user!.email!,
        displayName: credential.user!.displayName || undefined
      }))
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  resetPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email));
  }
}