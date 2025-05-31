import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SearchFiltersComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CharactersListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'status',
    'species',
    'type',
    'gender',
    'created',
    'favorite' // <-- Solo si tienes la columna de favoritos en el HTML
  ];
  characters: any[] = [];
  filters = { name: '', status: '', species: '', type: '', gender: '', created: '' };

  @Output() charactersChange = new EventEmitter<any[]>();
  @Output() characterSelected = new EventEmitter<any>();

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoritesService
  ) {}

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
