import {ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Book} from './book';
import {BookService} from './book.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {SortEvent} from '../data/sort.event';
import {SortableHeaderDirective} from '../data/sortable-header.directive';
import {map, tap} from 'rxjs/operators';
import {compare} from '../data/compare';

@Component({
  selector: 'my-books',
  template: `
    <div class="container pt-4 pb-4">
      <h1>{{'book.title' | translate}}</h1>
      <ng-container *ngIf="books$ | async as books">
        <table class="table table-striped table-responsive">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col" sortable="title" (sort)="onSort($event)">{{'data.book.title' | translate}}</th>
            <th scope="col" sortable="authors" (sort)="onSort($event)">{{'data.book.authors' | translate}}</th>
            <th scope="col" sortable="yearRead" (sort)="onSort($event)">{{'data.book.year.read' | translate}}</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let book of books; index as zeroBasedRowNumber" book-row
              [book]="book"
              [rowNumber]="zeroBasedRowNumber+1"></tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styles: [
      `
      .asc::before {
        content: "\\25be";
        float: right;
        color: gray;
      }

      .desc::before {
        content: "\\25b4";
        float: right;
        color: gray;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;

  @ViewChildren(SortableHeaderDirective)
  sortableHeaderDirectives: QueryList<SortableHeaderDirective>;

  private sortEventBehaviorSubject = new BehaviorSubject<SortEvent>(SortEvent.unsortedEvent());

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    const books$ = this.bookService.getBooks$();

    const sortEventObservable$ = this.sortEventBehaviorSubject.asObservable().pipe(
      tap(sortEvent => this.resetHeadersToUnsorted(sortEvent))
    );

    this.books$ = combineLatest([books$, sortEventObservable$])
      .pipe(
        map(([books, sortEvent]) => this.sortBooks(books, sortEvent))
      );
  }

  private resetHeadersToUnsorted(sortEvent: SortEvent): void {
    if (!!this.sortableHeaderDirectives) {
      this.sortableHeaderDirectives
        .filter(header => !sortEvent.isEqualTo(header.sortable))
        .forEach(header => header.clearDirection());
    }
  }

  onSort(sortEvent: SortEvent): void {
    this.sortEventBehaviorSubject.next(sortEvent);
  }

  private sortBooks(books: Book[], sortEvent: SortEvent) {
    if (sortEvent.isUnsorted()) {
      return [...books];
    }
    return this.sortBooksAccordingToDirectionOfSortEvent(books, sortEvent);
  }

  private sortBooksAccordingToDirectionOfSortEvent(books: Book[], sortEvent: SortEvent): Book[] {
    return [...books].sort((book1, book2) => {
      const sortablePropertyName = sortEvent.sortablePropertyName;

      const bookProperty1 = book1[sortablePropertyName];
      const bookProperty2 = book2[sortablePropertyName];

      if (sortEvent.isAscending()) {
        return compare(bookProperty1, bookProperty2);
      }
      return compare(bookProperty2, bookProperty1);
    });
  }
}
