import { Component, Input, OnChanges } from '@angular/core';
import { GraphqlCharacterService } from '../../services/graphql-character.service';
import { NgIf, NgFor, DatePipe, SlicePipe } from '@angular/common';

interface Resident {
  id: string;
  name: string;
  image: string;
}
interface CharacterDetails {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  origin?: { name: string; residents: Resident[] };
  location?: { name: string; residents: Resident[] };
   episode?: { name: string }[];  
  
}

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, SlicePipe]
})
export class CharactersDetailsComponent implements OnChanges {
@Input() character: any;
  gqlCharacter: CharacterDetails | null = null;  // Tipo explícito
  

  constructor(private graphqlCharacterService: GraphqlCharacterService) {}

  ngOnChanges() {
    if (this.character?.id) {
      this.graphqlCharacterService.getCharacterWithResidents(this.character.id)
        .subscribe(result => {
          // Cast explícito para ayudar a Angular
          this.gqlCharacter = result.data.character as CharacterDetails;
        });
    }
  }

  copiarUrlDelPersonaje() {
    if (!this.gqlCharacter) return;
    const url = `${window.location.origin}${window.location.pathname}?characterId=${encodeURIComponent(this.gqlCharacter.id)}`;
    navigator.clipboard.writeText(url);
    alert('¡URL del personaje copiada al portapapeles!');
  }
}
