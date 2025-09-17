import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private apiUrl = '/api/save-pdf'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  saveCanvasAsPdf(canvasJson: string): Observable<any> {
    return this.http.post(this.apiUrl, { canvasData: canvasJson });
  }
}
