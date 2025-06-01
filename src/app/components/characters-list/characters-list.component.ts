import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

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
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CapitalizePipe
  ]
})
export class CharactersListComponent implements OnInit {

  typeTotals: { key: string, count: number }[] = [];
  speciesTotals: { key: string, count: number }[] = [];

  searchControl = new FormControl('');

  displayedColumns: string[] = [
    'image', 'name', 'status', 'species', 'type', 'gender', 'created', 'favorite'
  ];

  filters: { [key: string]: string } = {
    name: '', status: '', species: '', type: '', gender: '', created: '', 
  };

  characters: any[] = [];

  @Output() charactersChange = new EventEmitter<any[]>();
  @Output() characterSelected = new EventEmitter<any>();

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
  this.searchControl.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged()
  ).subscribe((name: string | null) => {
    this.filters['name'] = name || '';
    this.loadCharacters();
  });

  this.loadCharacters();
}

  onFilterChange(filters: any) {
    this.filters = { ...this.filters, ...filters };
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService.getCharacters(this.filters).subscribe((data: any) => {
      this.characters = data.results || [];
      this.calculateTotals();
      this.charactersChange.emit(this.characters);
    });
  }

  calculateTotals() {
    // Totales por tipo
    const typeMap: { [key: string]: number } = {};
    const speciesMap: { [key: string]: number } = {};

    for (const c of this.characters) {
      const typeKey = c.type || 'Sin tipo';
      typeMap[typeKey] = (typeMap[typeKey] || 0) + 1;

      const speciesKey = c.species || 'Sin especie';
      speciesMap[speciesKey] = (speciesMap[speciesKey] || 0) + 1;
    }

    this.typeTotals = Object.entries(typeMap).map(([key, count]) => ({ key, count }));
    this.speciesTotals = Object.entries(speciesMap).map(([key, count]) => ({ key, count }));
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
