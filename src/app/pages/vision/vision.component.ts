import { Component } from '@angular/core';
import { Card } from './software-craftsmanship-card/card';
import { CardService } from './software-craftsmanship-card/card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vision',
  template: `
    <div class="container-fluid pt-2">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">
            Dieter sees Software Development as a craft!
          </h5>
          <p class="card-text">
            As Software Craftsman Dieter raises the bar of professional software development by putting theory into practice.
            In addition, Dieter helps others to learn the craft.
            He applies the values from the Software Craftsmanship Manifesto in his daily work.
          </p>
        </div>
      </div>
      <div class="software-craftsmanship-values">
        <div class="card-deck">
          <ng-container *ngFor="let card of cards$ | async">
            <app-software-craftsmanship-card
              class="card"
              [card]="card"
            ></app-software-craftsmanship-card>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./vision.component.scss']
})
export class VisionComponent {
  cards$: Observable<Card[]>;

  constructor(private cardService: CardService) {
    this.cards$ = cardService.getCards$();
  }
}
