import { Routes, RouterModule } from '@angular/router';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { AddSerieComponent } from './components/add-serie/add-serie.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    { path: 'series', component: SeriesListComponent }, // Listado de series
    { path: 'add-serie', component: AddSerieComponent },
    { path: '', pathMatch: 'full', redirectTo:'series'}, // Añadir nueva 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}