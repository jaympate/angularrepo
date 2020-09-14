import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BookService} from './book.service';
import {TranslateServiceFacade} from '../../translation/translate.service.facade';
import {BehaviorSubject} from 'rxjs';
import {Book} from './book';
import {Builder} from 'builder-pattern';

describe('BookService', () => {
  let bookService: BookService;
  const currentLanguageSubject = new BehaviorSubject<string>(undefined);
  const bookSubject = new BehaviorSubject<Book[]>(undefined);
  let currentLanguage: string;

  beforeEach(() => {
    const get = jest.fn().mockReturnValue(bookSubject.asObservable());
    const getTranslationKnowingTheyAreLoaded = jest
      .fn()
      .mockImplementation((title: string) => title + '.' + currentLanguage);
    const getCurrentLanguage$ = jest
      .fn()
      .mockReturnValue(currentLanguageSubject.asObservable());

    TestBed.configureTestingModule({
      providers: [
        BookService,
        {
          provide: HttpClient,
          useValue: {get}
        },
        {
          provide: TranslateServiceFacade,
          useValue: {getTranslationKnowingTheyAreLoaded, getCurrentLanguage$}
        }
      ]
    });
  });

  describe('constructor', () => {
    it('retrieves the books from backend url `http://www.dieterjordens.be:10002/api/books`', () => {
      const httpClient = TestBed.inject(HttpClient);
      bookService = TestBed.inject(BookService);

      expect(
        httpClient.get
      ).toHaveBeenCalledWith(
        'http://www.dieterjordens.be:10002/api/books',
        {headers: expect.any(HttpHeaders)}
      );
    });
  });

  describe('getBooks$', () => {
    it('does not emit anything before translations are loaded', fakeAsync(() => {
      let dataEmitted;

      const aFrontendBook = Builder<Book>()
        .title('my frontend book')
        .authors('jos and flupke')
        .yearRead(2020)
        .isbn(1393)
        .build();

      bookService = TestBed.inject(BookService);

      bookSubject.next([aFrontendBook]);

      bookService
        .getBooks$()
        .subscribe((actualBooks) => (dataEmitted = actualBooks));
      tick();

      expect(dataEmitted).toBeUndefined();
    }));

    it('returns translated books (e.g. for English translations)', fakeAsync(() => {
      let dataEmitted;

      currentLanguage = 'en';

      const aFrontendBook = Builder<Book>()
        .title('my frontend book')
        .authors('jos and sien')
        .yearRead(2004)
        .isbn(124324)
        .build();
      const aBackendBook = Builder<Book>()
        .title('my backend book')
        .authors('jos and maria')
        .yearRead(2000)
        .isbn(341134)
        .build();
      const untranslatedBooks = [aFrontendBook, aBackendBook];

      currentLanguageSubject.next(currentLanguage);
      bookSubject.next(untranslatedBooks);

      bookService = TestBed.inject(BookService);

      bookService
        .getBooks$()
        .subscribe((actualBooks) => (dataEmitted = actualBooks));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "authors": "jos and sien.en",
            "isbn": 124324,
            "title": "my frontend book.en",
            "yearRead": 2004,
          },
          Object {
            "authors": "jos and maria.en",
            "isbn": 341134,
            "title": "my backend book.en",
            "yearRead": 2000,
          },
        ]
      `);
    }));

    it('re-translates correctly (e.g. from English to French)', fakeAsync(() => {
      let dataEmitted;

      bookService = TestBed.inject(BookService);
      bookSubject.next([
        Builder<Book>()
          .title('my frontend book')
          .authors('al and bilal')
          .yearRead(2003)
          .isbn(234134)
          .build(),
        Builder<Book>()
          .title('my backend book')
          .authors('jose and aimee')
          .yearRead(2009)
          .isbn(2314313)
          .build()
      ]);

      currentLanguage = 'nl';
      currentLanguageSubject.next(currentLanguage);

      bookService
        .getBooks$()
        .subscribe((actualBooks) => (dataEmitted = actualBooks));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "authors": "al and bilal.nl",
            "isbn": 234134,
            "title": "my frontend book.nl",
            "yearRead": 2003,
          },
          Object {
            "authors": "jose and aimee.nl",
            "isbn": 2314313,
            "title": "my backend book.nl",
            "yearRead": 2009,
          },
        ]
      `);

      currentLanguage = 'fr';
      currentLanguageSubject.next(currentLanguage);

      bookService
        .getBooks$()
        .subscribe((actualBooks) => (dataEmitted = actualBooks));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "authors": "al and bilal.fr",
            "isbn": 234134,
            "title": "my frontend book.fr",
            "yearRead": 2003,
          },
          Object {
            "authors": "jose and aimee.fr",
            "isbn": 2314313,
            "title": "my backend book.fr",
            "yearRead": 2009,
          },
        ]
      `);
    }));
  });
});
