import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  addFavorite(character: any) {
    const current = this.favoritesSubject.value;
    if (!current.find(fav => fav.id === character.id)) {
      this.favoritesSubject.next([...current, character]);
    }
  }

  removeFavorite(character: any) {
    const current = this.favoritesSubject.value;
    this.favoritesSubject.next(current.filter(fav => fav.id !== character.id));
  }
}
// Este servicio utiliza BehaviorSubject para manejar el estado de los favoritos
// y permite que otros componentes se suscriban a los cambios en el estado de los favoritos
// lo que facilita la comunicación entre componentes sin necesidad de emitir eventos manualmente.
// Además, este servicio puede ser inyectado en cualquier componente o servicio de la aplicación.