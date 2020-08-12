import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../models/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  lastMovies: any[];

  constructor(private pelicula: PeliculasService, private router: Router) { }

  ngOnInit() {
    this.getLastMovies();
  }

  getLastMovies() {
    this.pelicula.getAll().then(result => {
      this.lastMovies = result;
    }).catch(err => console.log(err))
  }
  mostrarPelicula(peliculaId) {
    this.router.navigate([`/pelicula/${peliculaId}`]);
  }

  onScroll() {
    this.getMoreMovies()
  }

  getMoreMovies() {
    this.pelicula.getMoreMovies(this.lastMovies.length, (this.lastMovies.length + 49))
      .then(result => result.forEach(element => this.lastMovies.push(element)))
      .catch(err => console.log(err));
  }

}

