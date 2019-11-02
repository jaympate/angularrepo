import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from './book';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TranslateServiceFacade} from '../../translation/translate.service.facade';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private untranslatedBooks: Book[];
  private readonly translatedBooks$: Observable<Book[]>;

  constructor(private http: HttpClient, private translateService: TranslateServiceFacade) {
    const currentLanguage$ = translateService.getCurrentLanguage$();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46d2FjaHR3b29yZFZvb3JCb2VrZW4='
      })
    };
    const books$: Observable<Book[]> = this.http.get<Book[]>(this.baseUrl, httpOptions);

    this.translatedBooks$ = combineLatest([books$, currentLanguage$])
      .pipe(
        map(([books]) => books),
        tap(books => this.cacheBooks(books)),
        map(() => this.translateBooks())
      );
  }

  private readonly baseUrl = `https://dj-website-backend.herokuapp.com/api/book`;

  getBooks$(): Observable<Book[]> {
    return this.translatedBooks$;
  }

  private cacheBooks(books: Book[]) {
    if (!this.untranslatedBooks) {
      this.untranslatedBooks = books;
    }
  }

  private translateBooks(): Book[] {
    return this.untranslatedBooks.map(book =>
      ({
        ...book,
        title: this.translateService.getTranslationKnowingTheyAreLoaded(book.title),
        authors: this.translateService.getTranslationKnowingTheyAreLoaded(book.authors)
      }));
  }
}
