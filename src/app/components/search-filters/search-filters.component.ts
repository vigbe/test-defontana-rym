import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
    selector: 'app-search-filters',
    templateUrl: './search-filters.component.html',
    styleUrls: ['./search-filters.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class SearchFiltersComponent {
  @Output() filterChange = new EventEmitter<any>();
  filters = { name: '', status: '', species: '', type: '' };
  // lista para el filtro de género
  speciesList = [
    'Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature',
    'Animal', 'Robot', 'Cronenberg', 'Disease', 'unknown'
  ];
// lista para el filtro de tipo
  typeList = [
    'Genetic experiment', 'Parasite', 'Superhuman', 'Robot', 'Cronenberg',
    'Disease', 'Human with antennae', 'unknown'
  ];
  private filterSubject = new Subject<any>();

  constructor() {
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(filters => {
      this.filterChange.emit(filters);
    });
  }

  emitChange() {
    this.filterSubject.next(this.filters);
  }
}