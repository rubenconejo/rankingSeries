import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SeriesListComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rankingMov';
}
