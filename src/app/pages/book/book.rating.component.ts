import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'book-rating',
  template: `
    <div class="book-rating">
      <span *ngFor="let n of fullStars(rating)" class="fa fa-star checked"></span>
      <span *ngIf="hasHalfStar(rating)" class="fa fa-star-half-empty"></span>
      <span *ngFor="let n of emptyStars(rating)" class="fa fa-star-o"></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .fa-star, .fa-star-half-empty, .fa-star-o {
      color: orange;
    }
    .book-rating{
      min-width: 100px;
    }
  `]
})
export class BookRatingComponent {
  @Input()
  rating: number;

  private static amountOfFullStars(rating: number) {
    return Math.floor(rating);
  }

  private static amountOfEmptyStars(rating: number) {
    return 5 - Math.ceil(rating);
  }

  fullStars(rating: number) {
    return Array(BookRatingComponent.amountOfFullStars(rating));
  }

  emptyStars(rating: number) {
    return Array(BookRatingComponent.amountOfEmptyStars(rating));
  }

  hasHalfStar(rating: number) {
    return rating % 1 !== 0;
  }
}
