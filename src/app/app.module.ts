import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// acá importamos los componentes que vamos a usar
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersDetailsComponent } from './components/characters-details/characters-details.component';
import { TotalsComponent } from './components/totals/totals.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    CharactersListComponent,
    CharactersDetailsComponent,
    TotalsComponent,
    SearchFiltersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
