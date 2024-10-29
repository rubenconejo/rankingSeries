import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SeriesService {
  private apiUrl = 'http://localhost:3000/series';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addSerie(serie: any): Observable<any> {
    return this.http.post(this.apiUrl, serie);
  }

  addValoracion(id: number, valoracion: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, valoracion);
  }
}
