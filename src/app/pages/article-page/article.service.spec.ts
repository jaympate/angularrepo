import {TestBed} from '@angular/core/testing';
import {ArticleService} from './article.service';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {Article} from './article';
import {Builder} from 'builder-pattern';
import {environment} from '../../../environments/environment';


describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        HttpClient
      ]
    });
  });

  it('returns the articles observable of the backend', async () => {
    const articlesBackend = [
      Builder<Article>()
        .url('http://www.google.be')
        .title('an article of google')
        .build(),
      Builder<Article>()
        .url('http://www.medium.com')
        .title('an article of medium')
        .build()
    ];

    const get = jest.fn().mockReturnValue(of(articlesBackend));
    TestBed.overrideProvider(HttpClient, { useValue: {get}});

    const articleService = TestBed.inject(ArticleService);

    const actualArticles = await articleService.getArticles$().toPromise();

    expect(actualArticles).toEqual(articlesBackend);
  });

  it('calls the backend with the right configuration', async () => {
    const get = jest.fn().mockReturnValue(of([]));
    TestBed.overrideProvider(HttpClient, { useValue: {get}});

    const articleService = TestBed.inject(ArticleService);
    const httpClient = TestBed.inject(HttpClient);

    await articleService.getArticles$().toPromise();

    expect(httpClient.get).toHaveBeenCalledWith(`https://www.dieterjordens.com/api/articles`, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
  });

  it('logs an error when an error occurs', async () => {
    const errorSpy = spyOn(console, 'error');
    const message = 'An error';
    const get = jest.fn().mockReturnValue(throwError({message}));
    TestBed.overrideProvider(HttpClient, { useValue: {get}});

    const articleService = TestBed.inject(ArticleService);

    await articleService.getArticles$().toPromise();

    expect(errorSpy).toHaveBeenCalledWith(`An error has occurred when retrieving articles: ${message}`);
  });

  it('returns an empty array of articles when an error occurs', async () => {
    spyOn(console, 'error');
    const get = jest.fn().mockReturnValue(throwError({}));
    TestBed.overrideProvider(HttpClient, { useValue: {get}});
    const articleService = TestBed.inject(ArticleService);

    const actualArticles = await articleService.getArticles$().toPromise();

    expect(actualArticles).toEqual([]);
  });
});
