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
    'image', 'name', 'status', 'species', 'type', 'gender', 'created', 'favorite'
  ];
  // Cambia el tipado aquí:
  filters: { [key: string]: string } = {
    name: '', status: '', species: '', type: '', gender: '', created: ''
  };
  characters: any[] = [];

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
    this.favoritesService.addFavorite(character);
  }

  copiarUrlConFiltros() {
    const params = new URLSearchParams();
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key]) params.set(key, this.filters[key]);
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    alert('¡URL copiada al portapapeles!');
  }
}
