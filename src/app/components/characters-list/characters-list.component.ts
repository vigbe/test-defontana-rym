import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// Acá importaos los servicios de Character y Favorites
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters: any[] = [];
filters = { name: '', status: '' };

@Output() charactersChange = new EventEmitter<any[]>();
@Output() characterSelected = new EventEmitter<any>();

  constructor(private characterService: CharacterService, private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  onFilterChange(filters: any) {
    this.filters = filters;
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService.getCharacters(this.filters).subscribe((data: any) => {
      this.characters = data.results;
      this.charactersChange.emit(this.characters);
    });
  }

  selectCharacter(character: any) {
    this.characterSelected.emit(character);
  }

  markAsFavorite(character: any) {
    this.favoritesService.setFavorite(character);
  }
}