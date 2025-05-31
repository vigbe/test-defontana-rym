// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  characters: any[] = []; // <-- Para <app-totals>
  selectedCharacter: any = null; // <-- Para <app-character-detail>
}
