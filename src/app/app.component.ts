
import { Component } from '@angular/core';
import { TotalsComponent } from './components/totals/totals.component';
import { CharactersDetailsComponent } from './components/characters-details/characters-details.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [FavoritesComponent, CharactersListComponent, CharactersDetailsComponent, TotalsComponent]
})
export class AppComponent {
  characters: any[] = []; 
  selectedCharacter: any = null; 
}
