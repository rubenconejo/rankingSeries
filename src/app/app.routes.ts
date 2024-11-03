import { Routes, RouterModule } from '@angular/router';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { AddSerieComponent } from './components/add-serie/add-serie.component';
import { NgModule } from '@angular/core';
import { AddRatingComponent } from './components/add-rating/add-rating.component';


export const routes: Routes = [
    { path: 'series', component: SeriesListComponent },
    { path: 'add-serie', component: AddSerieComponent },
    { path: 'add-rating/:serieId', component: AddRatingComponent },
    { path: '', pathMatch: 'full', redirectTo:'series'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}