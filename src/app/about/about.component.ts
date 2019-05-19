import {Component, OnInit} from '@angular/core';
import {Card} from './software-craftsmanship-card/card';
import {CardService} from './software-craftsmanship-card/card.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-about',
  template: `
    <div class="card text-center">
      <div class="card-header">
        {{'website.what.to.expect.of.me' | translate}}
      </div>
      <div class="card-body">
        <h5 class="card-title">{{'website.what.is.my.vision' | translate}}</h5>
        <p class="card-text">{{'website.what.is.my.mission' | translate}}</p>
      </div>
    </div>
    <div class="software-craftsmanship-values">
      <div class="card-deck">
        <ng-container *ngFor="let card of cards$ | async">
          <app-software-craftsmanship-card class="card" [card]="card"></app-software-craftsmanship-card>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .software-craftsmanship-values {
      padding: 1.5rem;
      margin-right: 0;
      margin-left: 0;
      border-width: .2rem;
    }
  `]
})
export class AboutComponent implements OnInit {
  cards$: Observable<Array<Card>>;

  constructor(private cardService: CardService) {
    this.cards$ = cardService.getCards$();
  }

  ngOnInit() {
  }
}
