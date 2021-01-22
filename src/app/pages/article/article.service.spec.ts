import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleService } from './article.service';
import { TranslateServiceFacade } from '../../translation/translate.service.facade';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article';
import { Builder } from 'builder-pattern';

describe('ArticleService', () => {
  let articleService: ArticleService;
  const currentLanguageSubject = new BehaviorSubject<string>(undefined);
  const articleSubject = new BehaviorSubject<Article[]>(undefined);
  let currentLanguage: string;

  beforeEach(() => {
    const get = jest.fn().mockReturnValue(articleSubject.asObservable());
    const getTranslationKnowingTheyAreLoaded = jest
      .fn()
      .mockImplementation((title: string) => title + '.' + currentLanguage);
    const getCurrentLanguage$ = jest
      .fn()
      .mockReturnValue(currentLanguageSubject.asObservable());

    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        {
          provide: HttpClient,
          useValue: { get }
        },
        {
          provide: TranslateServiceFacade,
          useValue: { getTranslationKnowingTheyAreLoaded, getCurrentLanguage$ }
        }
      ]
    });
  });

  describe('constructor', () => {
    it('retrieves the articles from backend url `http://www.dieterjordens.be:10002/api/articles`', () => {
      const httpClient = TestBed.inject(HttpClient);
      articleService = TestBed.inject(ArticleService);

      expect(httpClient.get).toHaveBeenCalledWith(
        'http://www.dieterjordens.be:10002/api/articles',
        {
          headers: expect.any(HttpHeaders)
        }
      );
    });
  });

  describe('getArticles$', () => {
    it('does not emit anything before translations are loaded', fakeAsync(() => {
      let dataEmitted;

      const aFrontendArticle = Builder<Article>()
        .title('my frontend article')
        .url('www.medium.com/life-is-fun')
        .publicationDate(new Date('2020-03-21'))
        .category('frontend')
        .build();

      articleService = TestBed.inject(ArticleService);

      articleSubject.next([aFrontendArticle]);

      articleService
        .getArticles$()
        .subscribe((actualArticles) => (dataEmitted = actualArticles));
      tick();

      expect(dataEmitted).toBeUndefined();
    }));

    it('returns translated articles (e.g. for English translations)', fakeAsync(() => {
      let dataEmitted;

      currentLanguage = 'en';

      const aFrontendArticle = Builder<Article>()
        .title('my frontend article')
        .url('www.medium.com/life-is-fun')
        .publicationDate(new Date('2020-03-21'))
        .category('frontend')
        .build();
      const aBackendArticle = Builder<Article>()
        .title('my backend article')
        .publicationDate(new Date('2020-02-15'))
        .category('backend')
        .build();
      const untranslatedArticles = [aFrontendArticle, aBackendArticle];

      currentLanguageSubject.next(currentLanguage);
      articleSubject.next(untranslatedArticles);

      articleService = TestBed.inject(ArticleService);

      articleService
        .getArticles$()
        .subscribe((actualArticles) => (dataEmitted = actualArticles));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "category": "frontend",
            "key": "my frontend article",
            "publicationDate": 2020-03-21T00:00:00.000Z,
            "title": "my frontend article.en",
            "url": "www.medium.com/life-is-fun",
          },
          Object {
            "category": "backend",
            "key": "my backend article",
            "publicationDate": 2020-02-15T00:00:00.000Z,
            "title": "my backend article.en",
          },
        ]
      `);
    }));

    it('re-translates correctly (e.g. from English to French)', fakeAsync(() => {
      let dataEmitted;

      articleService = TestBed.inject(ArticleService);
      articleSubject.next([
        Builder<Article>()
          .title('my frontend article')
          .url('www.medium.com/life-is-fun')
          .publicationDate(new Date('2020-03-21'))
          .category('frontend')
          .build(),
        Builder<Article>()
          .title('my backend article')
          .publicationDate(new Date('2020-02-15'))
          .category('backend')
          .build()
      ]);

      currentLanguage = 'nl';
      currentLanguageSubject.next(currentLanguage);

      articleService
        .getArticles$()
        .subscribe((actualArticles) => (dataEmitted = actualArticles));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "category": "frontend",
            "key": "my frontend article",
            "publicationDate": 2020-03-21T00:00:00.000Z,
            "title": "my frontend article.nl",
            "url": "www.medium.com/life-is-fun",
          },
          Object {
            "category": "backend",
            "key": "my backend article",
            "publicationDate": 2020-02-15T00:00:00.000Z,
            "title": "my backend article.nl",
          },
        ]
      `);

      currentLanguage = 'fr';
      currentLanguageSubject.next(currentLanguage);

      articleService
        .getArticles$()
        .subscribe((actualArticles) => (dataEmitted = actualArticles));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "category": "frontend",
            "key": "my frontend article",
            "publicationDate": 2020-03-21T00:00:00.000Z,
            "title": "my frontend article.fr",
            "url": "www.medium.com/life-is-fun",
          },
          Object {
            "category": "backend",
            "key": "my backend article",
            "publicationDate": 2020-02-15T00:00:00.000Z,
            "title": "my backend article.fr",
          },
        ]
      `);
    }));
  });
});
