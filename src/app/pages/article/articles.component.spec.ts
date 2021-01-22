import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ArticlesComponent } from './articles.component';
import { TranslatePipeMock } from '../../translation/translate.pipe.mock';
import { DateLocaleFilter } from '../../common/date.locale.filter';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article';
import { Builder } from 'builder-pattern';
import { MockComponent } from 'ng-mocks';
import { ArticleComponent } from './article.component';
import { By } from '@angular/platform-browser';
import { SortableHeaderDirective } from '../data/sortable-header.directive';
import { ArticleService } from './article.service';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  const articleSubject = new BehaviorSubject<Article[]>(null);

  beforeEach(() => {
    const articles$ = jest.fn().mockReturnValue(articleSubject.asObservable());

    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientModule, TranslateModule.forRoot()],
      declarations: [
        ArticlesComponent,
        SortableHeaderDirective,
        MockComponent(ArticleComponent),
        TranslatePipeMock,
        DateLocaleFilter
      ],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            getArticles$: articles$
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.debugElement.componentInstance;
  });

  describe('on init', () => {
    it('passes the articles from the service to the article row components as input and not sorted', () => {
      const articles = [
        Builder<Article>().title('first article').build(),
        Builder<Article>().title('second article').build()
      ];

      articleSubject.next(articles);

      fixture.detectChanges();

      const actualarticles = getArticleRowComponents().map(
        (articleRowComponent) => articleRowComponent.article
      );

      expect(actualarticles).toEqual(articles);
    });

    it('should number every article correctly, for the amount of articles', () => {
      const articles = [
        Builder<Article>().build(),
        Builder<Article>().build(),
        Builder<Article>().build()
      ];

      articleSubject.next(articles);

      fixture.detectChanges();

      const actualRowNumbers = getArticleRowComponents().map(
        (articleRowComponent) => articleRowComponent.rowNumber
      );

      expect(actualRowNumbers).toEqual([1, 2, 3]);
    });
  });

  describe('sorting', () => {
    beforeEach(() => {
      const articles = [
        Builder<Article>()
          .publicationDate(new Date('2020-12-15'))
          .title('the good article')
          .build(),
        Builder<Article>()
          .publicationDate(new Date('2019-05-18'))
          .title('the bad article')
          .build(),
        Builder<Article>()
          .publicationDate(new Date('2020-03-01'))
          .title('the ugly article')
          .build()
      ];

      articleSubject.next(articles);
      fixture.detectChanges();
    });

    it('sorts articles "date of publication" ascending on first click', () => {
      const publicationDate = `publicationDate`;

      clickSortableColumn(publicationDate);

      const actualArticles = getArticleRowComponents().map(
        (articleRowComponent) => articleRowComponent.article
      );

      expect(actualArticles).toMatchInlineSnapshot(`
        Array [
          Object {
            "publicationDate": 2019-05-18T00:00:00.000Z,
            "title": "the bad article",
          },
          Object {
            "publicationDate": 2020-03-01T00:00:00.000Z,
            "title": "the ugly article",
          },
          Object {
            "publicationDate": 2020-12-15T00:00:00.000Z,
            "title": "the good article",
          },
        ]
      `);
    });

    it('sorts articles "date of publication" descending on second click', () => {
      const publicationDate = `publicationDate`;

      clickSortableColumn(publicationDate, 2);

      const actualArticles = getArticleRowComponents().map(
        (articleRowComponent) => articleRowComponent.article
      );

      expect(actualArticles).toMatchInlineSnapshot(`
        Array [
          Object {
            "publicationDate": 2020-12-15T00:00:00.000Z,
            "title": "the good article",
          },
          Object {
            "publicationDate": 2020-03-01T00:00:00.000Z,
            "title": "the ugly article",
          },
          Object {
            "publicationDate": 2019-05-18T00:00:00.000Z,
            "title": "the bad article",
          },
        ]
      `);
    });

    it('articles are unsorted again on "date of publication" on third click', () => {
      const publicationDate = `publicationDate`;

      clickSortableColumn(publicationDate, 3);

      const actualArticles = getArticleRowComponents().map(
        (articleRowComponent) => articleRowComponent.article
      );

      expect(actualArticles).toMatchInlineSnapshot(`
        Array [
          Object {
            "publicationDate": 2020-12-15T00:00:00.000Z,
            "title": "the good article",
          },
          Object {
            "publicationDate": 2019-05-18T00:00:00.000Z,
            "title": "the bad article",
          },
          Object {
            "publicationDate": 2020-03-01T00:00:00.000Z,
            "title": "the ugly article",
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

  function getArticleRowComponents(): ArticleComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(ArticleComponent))
      .map(
        (articleRowComponent) => articleRowComponent.componentInstance
      ) as ArticleComponent[];
  }
});
