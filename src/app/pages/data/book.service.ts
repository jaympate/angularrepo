import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from './book';
import {combineLatest, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {distinctUntilChanged, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private untranslatedBooks: Book[];
  private currentLanguageTranslation$: Observable<any>;
  private books$: Observable<Book[]>;

  constructor(private http: HttpClient, private translateService: TranslateService) {
    this.currentLanguageTranslation$ = this.translateService.stream('current.language').pipe(distinctUntilChanged());
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
        title: this.translateService.instant(book.title),
        authors: this.translateService.instant(book.authors)
      });
    });
  }
}
