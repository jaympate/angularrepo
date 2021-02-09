import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Article } from './article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateServiceFacade } from '../../translation/translate.service.facade';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private untranslatedArticles: Article[];
  private readonly translatedArticles$: Observable<Article[]>;
  private readonly baseUrl = `https://www.dieterjordens.com/api/articles`;

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
    const articles$: Observable<Article[]> = this.http.get<Article[]>(
      this.baseUrl,
      httpOptions
    );

    this.translatedArticles$ = combineLatest([
      articles$,
      currentLanguage$
    ]).pipe(
      filter(([, currentLanguage]) => !!currentLanguage),
      map(([articles]) => articles),
      tap((articles) => this.cacheArticles(articles)),
      map(() => this.translateArticles())
    );
  }

  getArticles$(): Observable<Article[]> {
    return this.translatedArticles$;
  }

  private cacheArticles(articles: Article[]) {
    if (!this.untranslatedArticles) {
      this.untranslatedArticles = articles;
    }
  }

  private translateArticles(): Article[] {
    return this.untranslatedArticles.map((article) => ({
      ...article,
      key: article.title,
      title: this.translateService.getTranslationKnowingTheyAreLoaded(
        article.title
      )
    }));
  }
}
