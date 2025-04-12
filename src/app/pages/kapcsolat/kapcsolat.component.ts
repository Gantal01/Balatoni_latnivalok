import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kapcsolat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="container">
      <h2>Kapcsolat</h2>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email cím</mat-label>
          <input matInput formControlName="email" type="email" placeholder="pelda@domain.com">
          <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
            Az email cím megadása kötelező
          </mat-error>
          <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
            Kérlek, adj meg egy érvényes email címet
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Üzenet tárgya</mat-label>
          <input matInput formControlName="subject" placeholder="Tárgy">
          <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
            Az üzenet tárgyának megadása kötelező
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Üzenet</mat-label>
          <textarea matInput formControlName="message" rows="5" placeholder="Írd ide az üzeneted..."></textarea>
          <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
            Az üzenet megadása kötelező
          </mat-error>
        </mat-form-field>

        <div class="button-container">
          <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid">
            Küldés
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 16px;
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
      }
      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .full-width {
        width: 100%;
      }
      .button-container {
        text-align: center;
      }
      button {
        padding: 0 32px;
      }
    `
  ]
})
export class KapcsolatComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Űrlap elküldve:', this.contactForm.value);
      // Itt lehetne egy API hívás vagy más logika az űrlap adatainak elküldésére
      alert('Üzenet elküldve! Köszönjük, hogy kapcsolatba léptél velünk.');
      this.contactForm.reset();
    }
  }
}