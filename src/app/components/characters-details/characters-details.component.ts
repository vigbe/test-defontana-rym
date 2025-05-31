import { Component, Input, OnChanges } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { NgIf, DatePipe } from '@angular/common';


@Component({
    selector: 'app-characters-details',
    templateUrl: './characters-details.component.html',
    styleUrls: ['./characters-details.component.scss'],
    standalone: true,
    imports: [NgIf, DatePipe]
})
export class CharactersDetailsComponent implements OnChanges {
  @Input() character: any;
  origin: any = null;
  originResident: any = null;
  location: any = null;
  locationResident: any = null;
  episode: any = null;

  constructor(private characterService: CharacterService) {}

  ngOnChanges() {
    if (this.character) {
      if (this.character.origin.url) {
        this.characterService.getLocation(this.character.origin.url).subscribe(loc => {
          this.origin = loc;
          this.originResident = loc.residents.length ? loc.residents[0] : null;
        });
      }
      if (this.character.location.url) {
        this.characterService.getLocation(this.character.location.url).subscribe(loc => {
          this.location = loc;
          this.locationResident = loc.residents.length ? loc.residents[0] : null;
        });
      }
      if (this.character.episode.length) {
        this.characterService.getEpisode(this.character.episode[0]).subscribe(ep => {
          this.episode = ep;
        });
      }
    }
  }
}
