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
            Software Development is a Craft
          </h5>
          <div class='card-text-software'>
            <p class="card-text">
              Dieter realises software is expensive and therefore chooses to work in a qualitative way. Doing it right from the first time saves you a lot of money.
              That is why he applies the principles of the <a href='https://agilemanifesto.org/principles.html'>Agile Manifesto</a> in his work.
              Working qualitative does not mean slow, but rather structured. To move forward, you have to be critical to your work, day in and day out.
            </p>
          </div>
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
