import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent {

  series: any[] = [];
  filteredSeries: any[] = [];

  constructor(private seriesService: SeriesService, private router: Router) { }

  ngOnInit() {
    this.seriesService.getSeries().subscribe((data) => {
      this.series = data;
      this.series = this.groupAndSortSeries(data);
      this.filteredSeries = [...this.series];
    });
  }

  private groupAndSortSeries(seriesList: any[]): any[] {
    const grouped = seriesList.reduce((acc, serie) => {
      if (!acc[serie.id]) {
        acc[serie.id] = { ...serie, valoraciones: [] };
      }
      const ratings = serie.valoraciones || [];
      acc[serie.id].valoraciones.push(...ratings);
      const total = acc[serie.id].valoraciones.reduce((sum: number, rating: { puntuacion: number }) => sum + rating.puntuacion, 0);
      acc[serie.id].valoracionMedia = acc[serie.id].valoraciones.length ? total / acc[serie.id].valoraciones.length: 0;
      return acc;
    }, {});
    return Object.values(grouped).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
  }

  getRatingClass(valoracionMedia: number): string {
    if (valoracionMedia >= 7) {
      return 'high-rating';
    } else if (valoracionMedia >= 5) {
      return 'medium-rating';
    } else {
      return 'low-rating';
    }
  }

  navigateToAddRating(serieId: string) {
    if (serieId) {
      this.router.navigate(['/add-rating', serieId]);
    } else {
      console.error("Error: El ID de la serie es undefined o vacío.");
    }
    this.router.navigate(['/add-rating', serieId]);
  }

  applyFilters(filters: any) {
    this.filteredSeries = this.series
      .filter(serie => {
        return serie.nombre.toLowerCase().includes(filters.nombre.toLowerCase());
      })
      .map(serie => ({
        ...serie,
        id: serie.id ? String(serie.id) : ''
      }));
    switch (filters.orden) {
      case 'alf-asc':
        this.filteredSeries.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'alf-desc':
        this.filteredSeries.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'val-asc':
        this.filteredSeries.sort((a, b) => a.valoracionMedia - b.valoracionMedia);
        break;
      case 'val-desc':
        this.filteredSeries.sort((a, b) => b.valoracionMedia - a.valoracionMedia);
        break;
    }
  }
}
