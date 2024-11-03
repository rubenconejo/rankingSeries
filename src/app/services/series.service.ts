import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SeriesService {
  private apiUrl = 'http://localhost:3000/series';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(series => series.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }

  addSerie(serie: any): Observable<any> {
    return this.http.post(this.apiUrl, serie);
  }

  addRating(serieId: string, rating: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${serieId}`).pipe(
      switchMap((serie: any) => {
        if (!serie.valoraciones) {
          serie.valoraciones = [];
        }
        serie.valoraciones.push(rating);
        const total = serie.valoraciones.reduce((acc: number, val: any) => acc + val.puntuacion, 0);
        serie.valoracionMedia = total / serie.valoraciones.length;
        return this.http.put(`${this.apiUrl}/${serieId}`, serie);
      })
    );
  }
}
