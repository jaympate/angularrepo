import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Book} from './book';
import {BookService} from './book.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'my-books',
  template: `
    <div class="container-fluid pt-2 pb-2">
      <h2 class="books-title">BOOKS</h2>
      <ng-container *ngIf="books$ | async as books">
        <div class="books-container">
          <book *ngFor="let book of books"
                   class="book-container"
                   [book]="book">
          </book>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['books-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks$();
  }
}
