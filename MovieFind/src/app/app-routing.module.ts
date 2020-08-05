import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PeliculaComponent } from './pelicula/pelicula.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CatalogoComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'pelicula/:movieId', component: PeliculaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
