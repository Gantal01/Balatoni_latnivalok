import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DelComponent } from './pages/del/del.component';
import { EszakComponent } from './pages/eszak/eszak.component';
import { KapcsolatComponent } from './pages/kapcsolat/kapcsolat.component';
import { KeresesComponent } from './pages/kereses/kereses.component';
import { LoginComponent} from './pages/register/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { ProfilComponent } from './pages/profil/profil/profil.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'del', component: DelComponent },
  { path: 'eszak', component: EszakComponent },
  { path: 'kapcsolat', component: KapcsolatComponent },
  { path: 'kereses', component: KeresesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];