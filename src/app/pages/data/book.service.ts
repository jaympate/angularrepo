import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from './book';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TranslateServiceFacade} from '../../translation/translate.service.facade';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private untranslatedBooks: Book[];
  private currentLanguageTranslation$: Observable<any>;
  private books$: Observable<Book[]>;

  constructor(private http: HttpClient, private translateService: TranslateServiceFacade) {
    this.currentLanguageTranslation$ = translateService.getCurrentLanguage$();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46d2FjaHR3b29yZFZvb3JCb2VrZW4='
      })
    };
    this.books$ = this.http.get<Book[]>(this.baseUrl, httpOptions);
  }

  private readonly baseUrl = `https://dj-website-backend.herokuapp.com/api/book`;

  getBooks$(): Observable<Book[]> {
    return combineLatest([this.books$, this.currentLanguageTranslation$])
      .pipe(
        map(([books]) => books),
        map(books => this.switchToUntranslatedBooks(books)),
        map(books => this.translateBooks(books))
      );
  }

  private switchToUntranslatedBooks(books: Book[]): Book[] {
    if (!this.untranslatedBooks) {
      this.untranslatedBooks = books;
    }
    return this.untranslatedBooks;
  }

  private translateBooks(books: Book[]): Book[] {
    return books.map(book => {
      return ({
        ...book,
        title: this.translateService.getTranslationKnowingTheyAreLoaded(book.title),
        authors: this.translateService.getTranslationKnowingTheyAreLoaded(book.authors)
      });
    });
  }
}
