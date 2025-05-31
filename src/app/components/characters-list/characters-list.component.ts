import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// Acá importaos los servicios de Character y Favorites
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { NgFor } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss'],
    standalone: true,
    imports: [SearchFiltersComponent, MatTable, NgFor, CommonModule]
})
export class CharactersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created'];
  characters: any[] = [];
  filters = { name: '', status: '', species: '', type: '', gender : '', created: '' };

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