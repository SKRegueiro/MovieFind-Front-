import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  baseUrl: string;
  arrayPeliculas: any[];

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://moviefind-app.herokuapp.com';
  }

  getAll(): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl).toPromise();
  }

  getMoviesByProvider(id): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/moviesByProvider`, { id: id }).toPromise();
  }

  getMoreMovies(from, to): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/moreMovies`, { from: from, to: to }).toPromise();
  }

  getPelicula(title): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/buscarTitle`, title).toPromise();
  }

  getById(id): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/buscarId`, { id: id }).toPromise();
  }

  getGenresById(id): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/genres`, { id: id }).toPromise();
  }

  autcomple(search): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/autocomplete`, { search: search }).toPromise();
  }

  getReleatedMovies(genreIds): Promise<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/releatedmovies`, { genreIds: genreIds }).toPromise();
  }
}
