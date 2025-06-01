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

  // Obtener todos los personajes con filtros
  getCharacters(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params = params.set(key, filters[key]);
    });
    return this.http.get(this.apiUrl, { params });
  }

  // Obtener un personaje específico por ID
  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Obtener ubicación por URL
  getLocation(url: string): Observable<any> {
    return this.http.get(url);
  }

  // Obtener episodio por URL
  getEpisode(url: string): Observable<any> {
    return this.http.get(url);
  }
}
