import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PeliculasService } from '../models/peliculas.service';
import { Router } from '@angular/router';
import { ProvidersService } from '../models/providers.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  title = 'MovieFind';
  keyword = 'title'
  formulario: FormGroup;
  searchResults: any[];

  constructor(private pelicula: PeliculasService, private router: Router) {
    this.formulario = new FormGroup({
      pelicula: new FormControl(''),
    });
    this.searchResults = []
  }

  ngOnInit() {
  }

  onSubmit(value) {
    this.pelicula.getPelicula(value)
      .then(result => this.mostrarPelicula(result[0]['id']))
      .catch(err => console.log(err));
  }

  onChangeSearch(event) {
    this.pelicula.autcomple(event)
      .then(result => {
        this.searchResults = this.saveAutocompleteData(result);
      })
      .catch(err => console.log(err));
  }
  saveAutocompleteData(result) {
    let informacion = [];
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      informacion.push(
        {
          id: element['id'],
          title: element['title'],
          poster: element['poster']

        })
    }
    return informacion;
  }

  mostrarPelicula(peliculaId) {
    this.router.navigate([`/pelicula/${peliculaId}`]);
  }
  selectEvent(event) {
    this.mostrarPelicula(event['id']);
  }
}
