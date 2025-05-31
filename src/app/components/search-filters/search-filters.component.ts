import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-filters',
    templateUrl: './search-filters.component.html',
    styleUrls: ['./search-filters.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class SearchFiltersComponent {
  @Output() filterChange = new EventEmitter<any>();
  filters = { name: '', status: '' };

  emitChange() {
    this.filterChange.emit(this.filters);
  }
}
