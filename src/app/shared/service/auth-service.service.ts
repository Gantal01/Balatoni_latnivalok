import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.user$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          const userDocRef = doc(this.firestore, `users/${user.uid}`);
          return docData(userDocRef, { idField: 'id' }).pipe(
            switchMap((userData: any) => {
              if (userData && isValidUser(userData)) {
                return of(userData as User);
              }
              return of({
                id: user.uid,
                email: user.email || '',
                displayName: user.email?.split('@')[0] || 'Anonymous',
                role: 'user' as const
              });
            })
          );
        }
        return of(null);
      })
    );
    
    // Segédfüggvény a típusellenőrzéshez
    function isValidUser(data: any): data is User {
      return (
        data &&
        typeof data.id === 'string' &&
        typeof data.email === 'string' &&
        typeof data.displayName === 'string' &&
        (data.role === 'admin' || data.role === 'user')
      );
    }
  }

  register(email: string, password: string, displayName: string = ''): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const userData: User = {
          id: userCredential.user.uid,
          email,
          displayName: displayName || email.split('@')[0],
          role: 'user'
        };
        const userDocRef = doc(this.firestore, `users/${userData.id}`);
        return from(setDoc(userDocRef, userData)).pipe(
          switchMap(() => of(void 0))
        );
      })
    );
  }

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(() => of(void 0))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}