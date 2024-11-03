import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent {

  series: any[] = [];

  constructor(private seriesService: SeriesService, private router: Router) { }

  ngOnInit() {
    this.seriesService.getSeries().subscribe((data) => {
      this.series = data;
      console.log(this.series);
      this.series = this.groupAndSortSeries(data);
    })
  }

  private groupAndSortSeries(seriesList: any[]): any[] {
    const groupedSeries = this.groupSeries(seriesList);
    const seriesWithAverage = this.calculateAverageRating(groupedSeries);

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
      const getRatings = serie.valoraciones || [];
      acc[serie.nombre].getRatings.push(...serie.valoraciones);
      return acc;
    }, {});
    return Object.values(grouped).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));

    // return Object.values(grouped);
  }

  private calculateAverageRating(seriesList: any[]): any[] {
    return seriesList.map((serie) => {
      const totalScore = serie.valoraciones.reduce((sum: number, valoracion: any) => sum + valoracion.puntuacion, 0);
      const quantityReviews = serie.valoraciones.length;
      serie.valoracionMedia = quantityReviews ? (totalScore / quantityReviews) : 0;
      return serie;
    });
  }

  getRatingClass(valoracionMedia: number): string {
    if (valoracionMedia >= 7) {
      return 'high-rating'; // Verde
    } else if (valoracionMedia >= 5) {
      return 'medium-rating'; // Amarillo
    } else {
      return 'low-rating'; // Rojo
    }
  }

  navigateToAddRating(serieId: number) {
    this.router.navigate(['/add-rating', serieId]);
  }
}
