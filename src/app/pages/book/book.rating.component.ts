import {Component, Input} from '@angular/core';

@Component({
  selector: 'book-rating',
  template: `
    <div class="book-rating" data-jest="stars">
      <span *ngFor="let fullStar of fullStars" class="fa fa-star checked" data-jest="full star"></span>
      <span *ngIf="hasAnHalfStar" class="fa fa-star-half-empty" data-jest="half star"></span>
      <span *ngFor="let emptyStar of emptyStars" class="fa fa-star-o" data-jest="empty star"></span>
    </div>
  `,
  styles: [`
    .fa-star, .fa-star-half-empty, .fa-star-o {
      color: orange;
    }

    .book-rating {
      min-width: 100px;
    }
  `]
})
export class BookRatingComponent {
  private readonly MAX_AMOUNT_OF_STARS = 5;

  @Input()
  rating = 0;

  private get amountOfFullStars(): number {
    return Math.floor(this.rating);
  }

  private get amountOfEmptyStars(): number {
    return this.MAX_AMOUNT_OF_STARS - Math.ceil(this.rating);
  }

  get fullStars(): any[] {
    return Array(this.amountOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.amountOfEmptyStars);
  }

  get hasAnHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }
}
