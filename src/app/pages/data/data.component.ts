import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {SortableHeaderDirective, SortEvent} from './sortable-header.directive';
import {map, tap} from 'rxjs/operators';
import {BookService} from './book.service';
import {compare} from './compare';

@Component({
  selector: 'app-data',
  template: `
    <div class="container pt-4">
      <h1>Books</h1>
      <div class="card">
        <div class="card-body">
          <p>{{'data.books.description' | translate}}</p>
          <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" sortable="title" (sort)="onSort($event)">{{'data.book.title' | translate}}</th>
              <th scope="col" sortable="authors" (sort)="onSort($event)">{{'data.book.authors' | translate}}</th>
              <th scope="col" sortable="yearRead" (sort)="onSort($event)">{{'data.book.year.read' | translate}}</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let book of books$ | async ; index as i">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.authors }}</td>
              <td>{{ book.yearRead }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
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
  ]
})
export class DataComponent implements OnInit {
  @ViewChildren(SortableHeaderDirective) sortableHeaderDirectives: QueryList<SortableHeaderDirective>;

  books$: Observable<Book[]>;
  originalBooks: Book[];
  sortEventBehaviorSubject = new BehaviorSubject<SortEvent>(SortEvent.ofEmpty());

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.books$ = combineLatest([
      this.bookService.getBooks$(),
      this.sortEventBehaviorSubject.asObservable()
    ]).pipe(
      tap(([, sortEvent]) => this.clearDirectionForEachOtherSortableHeader(sortEvent)),
      tap(([books]) => this.saveOriginalBooks(books)),
      map(([books, sortEvent]) => this.sortBooks(sortEvent, books))
    );
  }

  private sortBooks(sortEvent, books): Book[] {
    if (sortEvent.isUnsorted()) {
      return this.originalBooks;
    }
    return this.sortBooksAccordingToDirectionOfSortEvent(books, sortEvent);
  }

  private sortBooksAccordingToDirectionOfSortEvent(books, sortEvent): Book[] {
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

  private saveOriginalBooks(books): void {
    if (!this.originalBooksPresent()) {
      this.originalBooks = books;
    }
  }

  private originalBooksPresent(): boolean {
    return !!this.originalBooks;
  }

  private clearDirectionForEachOtherSortableHeader(sortEvent: SortEvent): void {
    if (this.sortableHeaderDirectivesPresent()) {
      this.sortableHeaderDirectives
        .filter(header => !sortEvent.isEqualTo(header.sortable))
        .forEach(header => header.clearDirection());
    }
  }

  private sortableHeaderDirectivesPresent(): boolean {
    return !!this.sortableHeaderDirectives;
  }

  onSort(sortEvent: SortEvent): void {
    this.sortEventBehaviorSubject.next(sortEvent);
  }
}
