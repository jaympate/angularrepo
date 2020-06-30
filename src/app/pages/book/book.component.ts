import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Book} from './book';

@Component({
  selector: '[book-row]',
  template: `
    <th scope="row">{{ rowNumber }}</th>
    <td>
      <div class="img-wrapper">
        <div class="book-cover-line"></div>
        <img
          loading="lazy"
          class="img-book"
          [src]="'data:image/jpg;base64,' + book.base64image | safeBase64Image"
          alt="Book cover of {{ book.title }}"
        />
      </div>
    </td>
    <td>
      <ngb-highlight class="book-title" [result]="book.title"></ngb-highlight>
    </td>
    <td>
      <ngb-highlight [result]="book.authors"></ngb-highlight>
    </td>
    <td>
      <ngb-highlight [result]="book.yearRead | numberToString"></ngb-highlight>
    </td>
    <td>
      <book-rating [rating]="book.rating"></book-rating>
    </td>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input()
  book: Book;

  @Input()
  rowNumber: number;
}
