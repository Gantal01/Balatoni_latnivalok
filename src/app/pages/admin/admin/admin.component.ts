import { Component } from '@angular/core';
import { DataUploadService } from '../../../shared/service/upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="uploadData()">Adatok feltöltése Firestore-ba</button>
  `
})
export class UploadDataComponent {
  constructor(private dataUploadService: DataUploadService) {}

  uploadData(): void {
    this.dataUploadService.uploadData();
  }
}