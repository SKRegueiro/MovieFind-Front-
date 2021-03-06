import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  baseUrl: string;
  arrayProviders: {};

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://moviefind-app.herokuapp.com';
    // this.baseUrl = 'http://localhost:3000';
  }

  getProviders(): Promise<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/providers`).toPromise();
  }

}
