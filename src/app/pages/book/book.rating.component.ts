import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'book-rating',
  template: `
    <div class="book-rating">
      <span *ngFor="let fullStar of fullStars" class="fa fa-star checked"></span>
      <span *ngIf="hasAnHalfStar" class="fa fa-star-half-empty"></span>
      <span *ngFor="let emptyStar of emptyStars" class="fa fa-star-o"></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  rating: number;

  private get amountOfFullStars() {
    return Math.floor(this.rating);
  }

  private get amountOfEmptyStars() {
    return this.MAX_AMOUNT_OF_STARS - Math.ceil(this.rating);
  }

  get fullStars() {
    return Array(this.amountOfFullStars);
  }

  get emptyStars() {
    return Array(this.amountOfEmptyStars);
  }

  get hasAnHalfStar() {
    return this.rating % 1 !== 0;
  }
}
