import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Book} from './book';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[book-row]',
  templateUrl: 'book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  @Input()
  book: Book;

  @Input()
  rowNumber: number;
}
