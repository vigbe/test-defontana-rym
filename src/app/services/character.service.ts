//este será el servicio que se encargará de las peticiones HTTP relacionadas con los personajes

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = `${environment.baseUrlAPI}/character`;
  constructor(private http: HttpClient) { }
  // Método para obtener todos los personajes
    getCharacters(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    // Añadir filtros a los parámetros de la solicitud
    Object.keys(filters).forEach(key => {
      if (filters[key]) params = params.set(key, filters[key]);
    });
    // Realizar la solicitud GET a la API
    return this.http.get(this.apiUrl, { params });
  }
  // Método para obtener un personaje específico por ID
  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }
  // Métodos para obtener ubicaciones y episodios
  getLocation(url: string): Observable<any> {
    return this.http.get(url);
  }
  // Método para obtener un episodio específico por URL
  getEpisode(url: string): Observable<any> {
    return this.http.get(url);
  }
}