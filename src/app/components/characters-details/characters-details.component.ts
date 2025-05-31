import { Component, Input, OnChanges } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, DatePipe]
})
export class CharactersDetailsComponent implements OnChanges {
  @Input() character: any;
  origin: any = null;
  originResidents: any[] = [];
  location: any = null;
  locationResidents: any[] = [];
  episode: any = null;

  constructor(private characterService: CharacterService) {}

  ngOnChanges() {
    if (this.character) {
      // Origen
      if (this.character.origin?.url) {
        this.characterService.getLocation(this.character.origin.url).subscribe(loc => {
          this.origin = loc;
          this.originResidents = (loc.residents && loc.residents.length)
            ? loc.residents.slice(0, 3) // Muestra hasta 3 residentes si quieres
            : [];
        });
      } else {
        this.origin = null;
        this.originResidents = [];
      }

      // Localización
      if (this.character.location?.url) {
        this.characterService.getLocation(this.character.location.url).subscribe(loc => {
          this.location = loc;
          this.locationResidents = (loc.residents && loc.residents.length)
            ? loc.residents.slice(0, 3)
            : [];
        });
      } else {
        this.location = null;
        this.locationResidents = [];
      }

      // Episodio
      if (this.character.episode?.length) {
        this.characterService.getEpisode(this.character.episode[0]).subscribe(ep => {
          this.episode = ep;
        });
      } else {
        this.episode = null;
      }
    }
  }
}
