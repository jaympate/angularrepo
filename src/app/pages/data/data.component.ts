import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {SortableHeaderDirective} from './sortable-header.directive';
import {map, startWith, tap} from 'rxjs/operators';
import {BookService} from './book.service';
import {compare} from './compare';
import {SortEvent} from './sort.event';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-data',
  template: `
    <div class="container pt-4">
      <ng-container *ngIf="sortedBooks$ | async as sortedBooks">
        <h1>{{'data.books.title' | translate}}</h1>
        <div class="card">
          <div class="card-body">
            <p>{{'data.books.description' | translate}}</p>
            <form>
              <div class="form-group form-inline">
                {{'data.books.search' | translate}}: <input class="form-control ml-2" type="text" [formControl]="filter"/>
              </div>
            </form>
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
              <tr *ngFor="let book of sortedBooks ; index as i">
                <th scope="row">{{ i + 1 }}</th>
                <td>
                  <ngb-highlight class="book-title" [result]="book.title" [term]="filter.value" (click)="goToISBNSearch(book.isbn)"></ngb-highlight>
                </td>
                <td>
                  <ngb-highlight [result]="book.authors" [term]="filter.value"></ngb-highlight>
                </td>
                <td>
                  <ngb-highlight [result]="book.yearRead | numberToString" [term]="filter.value"></ngb-highlight>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
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

          .book-title:hover {
              text-decoration: underline;
              color: blue;
              cursor: pointer;
          }
    `
  ]
})
export class DataComponent implements OnInit {
  @ViewChildren(SortableHeaderDirective) sortableHeaderDirectives: QueryList<SortableHeaderDirective>;

  sortedBooks$: Observable<Book[]>;
  originalBooks: Book[];
  sortEventBehaviorSubject = new BehaviorSubject<SortEvent>(SortEvent.unsortedEvent());

  filter = new FormControl('');

  constructor(private bookService: BookService, private router: Router) {
  }

  search(books: Book[], text: string): Book[] {
    const term = text.toLowerCase();
    return books.filter(book => book.title.toLowerCase().includes(term) ||
      book.authors.toLowerCase().includes(term) ||
      book.yearRead.toString().includes(term)
    );
  }

  ngOnInit(): void {
    const books$ = this.bookService.getBooks$().pipe(
      tap(books => this.cacheOriginalBooks(books))
    );

    const text$ = this.filter.valueChanges.pipe(startWith(''));

    const filteredBooks$ = combineLatest([books$, text$]).pipe(
      map(([books, text]) => this.search(books, text))
    );

    this.sortedBooks$ = combineLatest([filteredBooks$, this.sortEventBehaviorSubject.asObservable()]).pipe(
      tap(([, sortEvent]) => this.resetHeadersToUnsorted(sortEvent)),
      map(([books, sortEvent]) => this.sortBooks(books, sortEvent))
    );
  }

  private sortBooks(books: Book[], sortEvent: SortEvent): Book[] {
    if (sortEvent.isUnsorted()) {
      return this.originalBooks.filter(originalBook => books.includes(originalBook));
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

  private cacheOriginalBooks(books: Book[]): void {
    if (!this.originalBooksPresent()) {
      this.originalBooks = books;
    }
  }

  private originalBooksPresent(): boolean {
    return !!this.originalBooks;
  }

  private resetHeadersToUnsorted(sortEvent: SortEvent): void {
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

  goToISBNSearch(isbn: number): void {
    window.location.href = 'https://isbnsearch.org/isbn/' + isbn;
  }
}
