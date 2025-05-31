import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {
  @Output() filterChange = new EventEmitter<any>();
  filters = { name: '', status: '' };

  emitChange() {
    this.filterChange.emit(this.filters);
  }
}
