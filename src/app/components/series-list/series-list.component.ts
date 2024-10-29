import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent {

  series: any[] = [];

  constructor(private seriesService: SeriesService) { }

  ngOnInit() {
    this.seriesService.getSeries().subscribe((data) => {
      this.series = data;
      console.log(this.series);
      this.series = this.groupAndSortSeries(data);
    })
  }

  private groupAndSortSeries(seriesList: any[]): any[] {
    const groupedSeries = this.groupSeries(seriesList); // Agrupamos
    const seriesWithAverage = this.calculateAverageRating(groupedSeries); // Calculamos la media

    // Ordenamos alfabéticamente y retornamos
    return seriesWithAverage.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
  }


  private groupSeries(seriesList: any[]): any[] {
    const grouped = seriesList.reduce((acc, serie) => {
      if (!acc[serie.nombre]) {
        acc[serie.nombre] = {
          nombre: serie.nombre,
          plataforma: serie.plataforma,
          valoraciones: []
        };
      }
      acc[serie.nombre].valoraciones.push(...serie.valoraciones);
      return acc;
    }, {});

    // Convertimos el objeto agrupado a un array para facilitar el cálculo de la media
    return Object.values(grouped);
  }

  private calculateAverageRating(seriesList: any[]): any[] {
    return seriesList.map((serie) => {
      const totalScore = serie.valoraciones.reduce((sum: number, valoracion: any) => sum + valoracion.puntuacion, 0);
      const quantityReviews = serie.valoraciones.length;
      serie.valoracionMedia = quantityReviews ? (totalScore / quantityReviews) : 0;
      return serie;
    });
  }
}
