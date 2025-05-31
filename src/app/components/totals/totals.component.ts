import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnChanges {
  @Input() characters: any[] = [];
  speciesTotals: any[] = [];
  typeTotals: any[] = [];

  ngOnChanges() {
    this.speciesTotals = this.groupBy(this.characters, 'species');
    this.typeTotals = this.groupBy(this.characters, 'type');
  }

  groupBy(array: any[], key: string) {
    const map = new Map();
    array.forEach(item => {
      const k = item[key] || 'N/A';
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([key, count]) => ({ key, count }));
  }
}
