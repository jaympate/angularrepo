import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from './book';

@Component({
  selector: 'book',
  template: `
    <div data-div-container class="book-padding-bottom">
      <div class="book-wrapper">
        <div class="book-cover-line"></div>
        <img data-book-image class="book-img-top" defaultImage="assets/images/loading.gif"
             [lazyLoad]="lazyLoad"
             [alt]="book.title">
      </div>
      <div data-book-body>
        <h5 data-book-title [textContent]="book.title"></h5>
        <div data-book-authors [textContent]="book.authors"></div>
        <div data-book-bar class="book-bar"></div>
        <div data-book-yearRead>Read in: {{book.yearRead}}</div>
        <div>Rating: <book-rating class="book-rating" [rating]="book.rating"></book-rating></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input()
  book: Book;

  lazyLoad: string;

  ngOnInit(): void {
    this.lazyLoad = 'https://djbookcovers.s3.eu-west-3.amazonaws.com/' + this.book.isbn + '.jpeg';
  }
}
