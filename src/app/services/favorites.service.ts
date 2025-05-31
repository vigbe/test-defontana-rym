import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoriteSubject = new BehaviorSubject<any>(null);
  favorite$ = this.favoriteSubject.asObservable();

  setFavorite(character: any) {
    this.favoriteSubject.next(character);
  }
}
// Este servicio utiliza BehaviorSubject para manejar el estado de los favoritos
// y permite que otros componentes se suscriban a los cambios en el estado de los favoritos
// lo que facilita la comunicación entre componentes sin necesidad de emitir eventos manualmente.
// Además, este servicio puede ser inyectado en cualquier componente o servicio de la aplicación.