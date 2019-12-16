import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PeliculasService } from './models/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MovieFind';
  keyword = 'title';
  formulario: FormGroup;
  data: any[];

  constructor(private pelicula: PeliculasService, private router: Router) {
    this.formulario = new FormGroup({
      pelicula: new FormControl(''),
    });
    this.data = []
  }

  onSubmit(value) {
    this.pelicula.getPelicula(value)
      .then(result => {
        this.mostrarPelicula(result[0]['id']);
      }).catch(err => console.log(err));
  }

  ngOnInit() {
  }

  mostrarPelicula(peliculaId) {
    this.router.navigate([`/pelicula/${peliculaId}`]);
  }

  volverInicio() {
    this.router.navigate(['/catalogo']);
  }

  onFocused(e) {
    23

  }

  onChangeSearch(event) {
    this.pelicula.autcomple(event)
      .then(result => {
        this.data = this.saveAutocompleteData(result);
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


  selectEvent(event) {
    this.mostrarPelicula(event['id']);
  }
}
