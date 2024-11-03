import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  addRating(serieId: number, rating: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${serieId}`).pipe(
      switchMap((serie: any) => {
        serie.valoraciones.push(rating);
        return this.http.put(`${this.apiUrl}/${serieId}`, serie);
      })
    );
  }
}
