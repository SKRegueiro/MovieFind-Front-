import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PeliculasService } from './models/peliculas.service';
import { Router } from '@angular/router';
import { ProvidersService } from './models/providers.service';


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
  providers: any[];
  scrolled: boolean = false;

  constructor(private pelicula: PeliculasService, private providerService: ProvidersService, private router: Router, private changeDetector: ChangeDetectorRef) {
    this.formulario = new FormGroup({
      pelicula: new FormControl(''),
    });
    this.data = []
    this.providers = []
  }

  ngOnInit() {
    this.providerService.getProviders().then(result => {
      result.forEach(element => {
        this.providers.push(element)
      });
    })
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = () => {
    if (window.scrollY > 80) {
      this.scrolled = true
      this.changeDetector.detectChanges
    } else this.scrolled = false;

  };

  mostrarPelicula(peliculaId) {
    this.router.navigate([`/pelicula/${peliculaId}`]);
  }

  volverInicio() {
    this.router.navigate(['/catalogo']);
  }

  onChangeSearch(event) {
    this.pelicula.autcomple(event)
      .then(result => {
        this.data = this.saveAutocompleteData(result);
      })
      .catch(err => console.log(err));
  }

  //hay que pasarle el resultado a catalogo
  // loadProviderCatalog(event){
  //   this.pelicula.getMoviesByProvider(id).then(result => {
  //     this.data = 
  //   })
  // }


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
