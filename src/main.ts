import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(), provideFirebaseApp(() => initializeApp({ projectId: "balatoni-latnivalok-e28d1", appId: "1:748883538340:web:106d4e12e9e6db2c03d131", storageBucket: "balatoni-latnivalok-e28d1.firebasestorage.app", apiKey: "AIzaSyAqNJ0DsqMA9An1zeAk9tdF9Xv1u7yzy50", authDomain: "balatoni-latnivalok-e28d1.firebaseapp.com", messagingSenderId: "748883538340" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));