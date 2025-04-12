import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DelComponent } from './pages/del/del.component';
import { EszakComponent } from './pages/eszak/eszak.component';
import { KeresesComponent } from './pages/kereses/kereses.component';
import { KapcsolatComponent } from './pages/kapcsolat/kapcsolat.component';
import { MenuComponent } from "./shared/menu/menu.component";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HomeComponent, DelComponent, EszakComponent, KeresesComponent, KapcsolatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'balaton'
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    { provide: BrowserAnimationsModule }
  ]
}).catch(err => console.error(err));
