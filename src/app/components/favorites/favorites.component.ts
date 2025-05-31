import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorite: any = null;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.favorite$.subscribe(fav => this.favorite = fav);
  }
}
