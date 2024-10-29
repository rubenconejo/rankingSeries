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

  series:any [] = [];

  constructor(private seriesService: SeriesService){}

  ngOnInit(){
    this.seriesService.getSeries().subscribe((data) => {
      this.series = data;
      console.log(this.series);
    })
  }
}
