import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DelComponent } from './pages/del/del.component';
import { EszakComponent } from './pages/eszak/eszak.component';
import { KapcsolatComponent } from './pages/kapcsolat/kapcsolat.component';
import { KeresesComponent } from './pages/kereses/kereses.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'del', component: DelComponent },
  { path: 'eszak', component: EszakComponent },
  { path: 'kapcsolat', component: KapcsolatComponent },
  { path: 'kereses', component: KeresesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];