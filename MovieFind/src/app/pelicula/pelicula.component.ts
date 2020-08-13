import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../models/peliculas.service';
import { ProvidersService } from '../models/providers.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  movie: {
    'runtime': "",
    'age_certification': '',
    'poster': '',
    'title': '',
    'original_release_year': '',
    'short_description': ''
  };
  scoring: {};
  cast: {};
  offers: {};
  peliculasRecomendadas: {};
  seasons: {};
  genresArray: string[];
  backdrops: string[];
  providers: any[];
  posicion: number;
  intervalor: any;

  constructor(private pelicula: PeliculasService,
    private proveedorService: ProvidersService,
    private router: ActivatedRoute,
    private httpRouter: Router) {
    this.backdrops = [];
    this.genresArray = [];
    this.posicion = 0;
    this.intervalor = null;

  }

  ngOnInit() {
    if (this.intervalor != null) { clearInterval(this.intervalor); }
    this.peliculasRecomendadas = {};
    this.cambiarPosicion();
    this.getMovie();
    this.getProviderLogo(2);
  }

  cambiarPosicion() {
    this.intervalor = setInterval(() => {
      if (this.posicion === this.backdrops.length - 1) { this.posicion = 0 }
      else { this.posicion++ }
    }, 5000);
  }

  getMovie() {
    this.router.params.subscribe(params => {
      this.pelicula.getById(params['movieId']).then(result => {
        this.movie = result[0];
        this.loadInfo(this.movie)
      }).catch(err => console.log(err))
    })
  }

  loadInfo(movieObject) {
    console.log(movieObject)
    this.seasons = eval(movieObject['seasons']);
    console.log(this.seasons)
    if (this.offers != null) { this.offers = null }
    if (movieObject['scoring']) { this.scoring = eval(movieObject['scoring']); }
    // if (movieObject['credits']) { this.cast = eval(movieObject['credits']); }
    if (movieObject['offers']) { this.offers = eval(movieObject['offers']); }
    this.backdrops = [];

    if (movieObject['backdrops']) {
      for (const iterator of eval(movieObject['backdrops'])) {
        this.backdrops.push(`https://images.justwatch.com${iterator['backdrop_url']}`);
      }
    }

    this.getProviders();
    if (movieObject['genre_ids']) { this.getReleatedMovies((movieObject['genre_ids'])) }
    if (movieObject['genre_ids']) { this.getGenres(eval(movieObject['genre_ids'])); }
  }

  getProviders() {
    this.proveedorService.getProviders()
      .then(result => this.providers = result)
      .catch(err => console.log(err))
  }

  getProviderLogo(id) {
    let url: string;
    this.providers.forEach(element => {
      if (element['id'] == id) {
        url = element['icon_url']
      }
    });
    return url;
  }

  getGenres(genres: []) {
    console.log(genres)
    this.genresArray = []
    genres.forEach(element => {
      console.log(element)
      this.pelicula.getGenresById(element)
        .then(result => {
          console.log(result)
          this.genresArray.push(result[0]['translation'])
        })
        .catch(err => console.log(err))
    });

  }

  mostrarPelicula(peliculaId) {
    this.httpRouter.navigate([`/pelicula/${peliculaId}`]);
  }


  getReleatedMovies(genreIds) {
    this.pelicula.getReleatedMovies(genreIds)
      .then(result => this.peliculasRecomendadas = result)
      .catch(err => console.log(err))
  }
}
