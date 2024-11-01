import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SeriesListComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rankingMov';
}
