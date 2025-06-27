import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Observable of simplified User interface
  user$: Observable<User | null> = new Observable(subscriber => {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        subscriber.next(this.mapFirebaseUser(user));
      } else {
        subscriber.next(null);
      }
    });
  });

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(cred => this.mapFirebaseUser(cred.user))
    );
  }

  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(cred => this.mapFirebaseUser(cred.user))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  private mapFirebaseUser(user: FirebaseUser): User {
    return {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || undefined
    };
  }
}
