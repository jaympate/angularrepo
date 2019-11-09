import {TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';
import {ChangeLanguageButtonComponent} from '../../../header/change-language-button.component';
import {TranslateServiceFacade} from '../../../translation/translate.service.facade';
import {of} from 'rxjs';
import {BookService} from './book.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Book} from './book';
import SpyObj = jasmine.SpyObj;


describe('BookService', () => {
  beforeEach(configureTestingModule);

  describe('getBooks', () => {
    it('returns all books translated', async () => {
      const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

      const bookService: BookService = TestBed.get(BookService);
      const books = bookService.getBooks$().toPromise();

      const request = httpMock.expectOne('https://dj-website-backend.herokuapp.com/api/book');
      expect(request.request.method).toBe('GET');
      request.flush(BOOKS_FROM_BACKEND);
      expect(await books).toEqual(getTranslatedBooks());

      httpMock.verify();
    });
  });

  const BOOKS_FROM_BACKEND = [
    {
      title: '1st title',
      isbn: 421,
      yearRead: 2019,
      authors: 'Dieter Jordens'
    },
    {
      title: '2nd title',
      isbn: 422,
      yearRead: 2017,
      authors: 'Leeroy Jenkins'
    },
    {
      title: '3rd title',
      isbn: 424,
      yearRead: 2018,
      authors: 'Einstein himself'
    }
  ];


  function getBookTranslations(): string[] {
    return BOOKS_FROM_BACKEND.flatMap(book => [book.title, book.authors].map(x => x + '.translated'));
  }

  function getTranslatedBooks(): Book[] {
    return BOOKS_FROM_BACKEND.map(book =>
      ({
        ...book,
        title: book.title + '.translated',
        authors: book.authors + '.translated'
      }));
  }

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MockComponent(ChangeLanguageButtonComponent)
      ],
      providers: [
        {
          provide: TranslateServiceFacade,
          useValue: getMockedTranslateServiceDecorator()
        }
      ]
    });
  }

  function getMockedTranslateServiceDecorator(): SpyObj<TranslateServiceFacade> {
    const mock: SpyObj<TranslateServiceFacade> = jasmine.createSpyObj<TranslateServiceFacade>('translateServiceDecoratorMock', [
      'getCurrentLanguage$',
      'getTranslationKnowingTheyAreLoaded'
    ]);
    mock.getCurrentLanguage$.and.returnValue(of('nl'));
    mock.getTranslationKnowingTheyAreLoaded.and.returnValues(...getBookTranslations());
    return mock;
  }
});
