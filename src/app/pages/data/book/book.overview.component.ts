import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {SortableHeaderDirective} from '../sortable-header.directive';
import {map, startWith, tap} from 'rxjs/operators';
import {BookService} from './book.service';
import {compare} from '../compare';
import {SortEvent} from '../sort.event';
import {FormControl} from '@angular/forms';
import {Book} from './book';

@Component({
  selector: 'book-overview',
  template: `
    <div class="card" *ngIf="filteredAndSortedBooks$ | async as sortedBooks">
      <div class="card-header">
        <h5 class="mb-0">
          <button type="button" class="btn btn-link btn-black" data-toggle="collapse" data-target="#bookContent"
                  aria-controls="bookContent" aria-label="Toggle book content" [attr.aria-expanded]="!isCollapsed"
                  (click)="toggle()">
            <i class="fa" [ngClass]="isCollapsed ? 'fa-caret-down' : 'fa-caret-up'"></i>
            <span class="ml-2">{{'data.books.description' | translate}}</span>
          </button>
        </h5>
      </div>
      <div class="card-body" id="bookContent" [ngbCollapse]="isCollapsed">
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

          .btn-black {
              color: black;
          }

          .btn-black:focus {
              text-decoration: none;
          }
          
          .btn-black:hover {
              text-decoration: underline;
          }
    `
  ]
})
export class BookOverviewComponent implements OnInit {
  isCollapsed = true;

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  @ViewChildren(SortableHeaderDirective) sortableHeaderDirectives: QueryList<SortableHeaderDirective>;

  filteredAndSortedBooks$: Observable<Book[]>;
  cachedBlogposts: Book[];
  sortEventBehaviorSubject = new BehaviorSubject<SortEvent>(SortEvent.unsortedEvent());

  filter = new FormControl('');

  constructor(private bookService: BookService) {
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
      tap(books => this.cacheBooks(books))
    );

    const text$ = this.filter.valueChanges.pipe(startWith(''));

    const filteredBooks$ = combineLatest([books$, text$]).pipe(
      map(([books, text]) => this.search(books, text))
    );

    const sortEventObservable$ = this.sortEventBehaviorSubject.asObservable().pipe(
      tap(sortEvent => this.resetHeadersToUnsorted(sortEvent))
    );

    this.filteredAndSortedBooks$ = combineLatest([filteredBooks$, sortEventObservable$]).pipe(
      map(([books, sortEvent]) => this.sortBooks(books, sortEvent))
    );
  }

  private sortBooks(books: Book[], sortEvent: SortEvent): Book[] {
    if (sortEvent.isUnsorted()) {
      return this.cachedBlogposts.filter(originalBook => books.includes(originalBook));
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

  private cacheBooks(books: Book[]): void {
    this.cachedBlogposts = books;
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
