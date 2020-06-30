import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {BooksComponent} from './books.component';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';
import {DateLocaleFilter} from '../../common/date.locale.filter';
import {BookService} from './book.service';
import {BehaviorSubject} from 'rxjs';
import {Book} from './book';
import {Builder} from 'builder-pattern';
import {MockComponent} from 'ng-mocks';
import {BookComponent} from './book.component';
import {By} from '@angular/platform-browser';
import {SortableHeaderDirective} from '../data/sortable-header.directive';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  const bookSubject = new BehaviorSubject<Book[]>(null);

  beforeEach(() => {
    const books$ = jest.fn().mockReturnValue(bookSubject.asObservable());

    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientModule, TranslateModule.forRoot()],
      declarations: [
        BooksComponent,
        SortableHeaderDirective,
        MockComponent(BookComponent),
        TranslatePipeMock,
        DateLocaleFilter
      ],
      providers: [
        {
          provide: BookService,
          useValue: {
            getBooks$: books$
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.debugElement.componentInstance;
  });

  describe('on init', () => {
    it('passes the books from the service to the book row components as input and not sorted', () => {
      const books = [
        Builder<Book>().title('first book').build(),
        Builder<Book>().title('second book').build()
      ];

      bookSubject.next(books);

      fixture.detectChanges();

      const actualBooks = getBookRowComponents().map(
        (bookRowComponent) => bookRowComponent.book
      );

      expect(actualBooks).toEqual(books);
    });

    it('should number every book correctly, for the amount of books', () => {
      const books = [
        Builder<Book>().build(),
        Builder<Book>().build(),
        Builder<Book>().build()
      ];

      bookSubject.next(books);

      fixture.detectChanges();

      const actualRowNumbers = getBookRowComponents().map(
        (bookRowComponent) => bookRowComponent.rowNumber
      );

      expect(actualRowNumbers).toEqual([1, 2, 3]);
    });
  });

  describe('sorting', () => {
    beforeEach(() => {
      const books = [
        Builder<Book>().yearRead(2018).title('the good book').build(),
        Builder<Book>().yearRead(2020).title('the bad book').build(),
        Builder<Book>().yearRead(2019).title('the ugly book').build()
      ];

      bookSubject.next(books);
      fixture.detectChanges();
    });

    it('sorts books "yearRead" ascending on first click', () => {
      const yearRead = `yearRead`;

      clickSortableColumn(yearRead);

      const actualBooks = getBookRowComponents().map(
        (bookRowComponent) => bookRowComponent.book
      );

      expect(actualBooks).toMatchInlineSnapshot(`
        Array [
          Object {
            "title": "the good book",
            "yearRead": 2018,
          },
          Object {
            "title": "the ugly book",
            "yearRead": 2019,
          },
          Object {
            "title": "the bad book",
            "yearRead": 2020,
          },
        ]
      `);
    });

    it('sorts books "yearRead" descending on second click', () => {
      const yearRead = `yearRead`;

      clickSortableColumn(yearRead, 2);

      const actualBooks = getBookRowComponents().map(
        (bookRowComponent) => bookRowComponent.book
      );

      expect(actualBooks).toMatchInlineSnapshot(`
        Array [
          Object {
            "title": "the bad book",
            "yearRead": 2020,
          },
          Object {
            "title": "the ugly book",
            "yearRead": 2019,
          },
          Object {
            "title": "the good book",
            "yearRead": 2018,
          },
        ]
      `);
    });

    it('books are unsorted again on "yearRead" on third click', () => {
      const yearRead = `yearRead`;

      clickSortableColumn(yearRead, 3);

      const actualBooks = getBookRowComponents().map(
        (bookRowComponent) => bookRowComponent.book
      );

      expect(actualBooks).toMatchInlineSnapshot(`
        Array [
          Object {
            "title": "the good book",
            "yearRead": 2018,
          },
          Object {
            "title": "the bad book",
            "yearRead": 2020,
          },
          Object {
            "title": "the ugly book",
            "yearRead": 2019,
          },
        ]
      `);
    });
  });

  function clickSortableColumn(columnName: string, times = 1): void {
    const sortableColumn: HTMLElement = fixture.nativeElement.querySelector(
      `[sortable="${columnName}"]`
    );

    for (let i = 0; i < times; i++) {
      sortableColumn.click();
      fixture.detectChanges();
    }
  }

  function getBookRowComponents(): BookComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(BookComponent))
      .map(
        (bookRowComponent) => bookRowComponent.componentInstance
      ) as BookComponent[];
  }
});
