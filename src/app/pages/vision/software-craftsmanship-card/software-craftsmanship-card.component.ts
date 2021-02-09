import { Component, Input } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-software-craftsmanship-card',
  template: `
    <div class="text-center">
      <img [src]="card.src" height="200" [alt]="card.alt" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{card.title}}</h5>
      <ng-container *ngFor="let paragraph of card.paragraphs">
        <p class="card-text">{{ paragraph }}</p>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .card-body {
        padding-top: 0;
        font-size: 1rem;
      }
    `
  ]
})
export class SoftwareCraftsmanshipCardComponent {
  @Input()
  card: Card;
}
