import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Book } from './book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateServiceFacade } from '../../translation/translate.service.facade';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private untranslatedBooks: Book[];
  private readonly translatedBooks$: Observable<Book[]>;
  private readonly baseUrl = `www.dieterjordens.com:10002/api/books`;

  constructor(
    private http: HttpClient,
    private translateService: TranslateServiceFacade
  ) {
    const currentLanguage$ = translateService.getCurrentLanguage$();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46RWVuRWVudm91ZGlnV2FjaHR3b29yZA=='
      })
    };
    const books$: Observable<Book[]> = this.http.get<Book[]>(
      this.baseUrl,
      httpOptions
    );

    this.translatedBooks$ = combineLatest([books$, currentLanguage$]).pipe(
      filter(([, currentLanguage]) => !!currentLanguage),
      map(([books]) => books),
      tap((books) => this.cacheBooks(books)),
      map(() => this.translateBooks())
    );
  }

  getBooks$(): Observable<Book[]> {
    return this.translatedBooks$;
  }

  private cacheBooks(books: Book[]) {
    if (!this.untranslatedBooks) {
      this.untranslatedBooks = books;
    }
  }

  private translateBooks(): Book[] {
    return this.untranslatedBooks.map((book) => ({
      ...book,
      title: this.translateService.getTranslationKnowingTheyAreLoaded(
        book.title
      ),
      authors: this.translateService.getTranslationKnowingTheyAreLoaded(
        book.authors
      )
    }));
  }
}
