import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  @Output() favoriteSelected = new EventEmitter<any>();

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.favorites$.subscribe(favs => this.favorites = favs);
  }

  selectFavorite(fav: any) {
    this.favoriteSelected.emit(fav);
  }

  removeFavorite(fav: any) {
    this.favoritesService.removeFavorite(fav);
  }
}
