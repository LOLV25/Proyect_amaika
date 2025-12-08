import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private apiUrl = 'http://localhost:3000/api/ia-sugerencia';

  constructor(private http: HttpClient) {}

  obtenerSugerencia(producto: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { producto });
  }
}
