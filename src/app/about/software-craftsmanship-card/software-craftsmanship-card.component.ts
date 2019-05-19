import {Component, Input, OnInit} from '@angular/core';
import {Card} from './card';

@Component({
  selector: 'app-software-craftsmanship-card',
  template: `
    <img class="card-img-top" src="{{card.src}}" alt="{{card.alt | translate}}">
    <div class="card-body">
      <h5 class="card-title">{{card.title | translate}}</h5>
      <ng-container *ngFor="let paragraph of card.paragraphs">
        <p class="card-text">{{paragraph | translate}}</p>
      </ng-container>
    </div>
  `,
  styles: []
})
export class SoftwareCraftsmanshipCardComponent implements OnInit {
  @Input()
  card: Card;

  constructor() {
  }

  ngOnInit() {
  }

}
