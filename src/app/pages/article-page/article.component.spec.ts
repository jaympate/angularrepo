import {TestBed} from '@angular/core/testing';
import {ArticleComponent} from './article.component';
import {Article} from './article';
import {Builder} from 'builder-pattern';
import {MockDirective} from 'ng-mocks';
import {LazyLoadImageDirective} from 'ng-lazyload-image';
import moment from 'moment';

describe('ArticleComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent, MockDirective(LazyLoadImageDirective)],
    });
  });

  it('should display the component', () => {
    const fixture = TestBed.createComponent(ArticleComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should have a container div with padding on the bottom', () => {
    const fixture = TestBed.createComponent(ArticleComponent);
    const htmlElement: HTMLElement = fixture.nativeElement.querySelector(
      '[data-div-container]'
    );

    expect(htmlElement.classList.contains('article-padding-bottom')).toBeTruthy();
  });

  describe('should show an image', () => {
    it('with custom css class', () => {
      const fixture = TestBed.createComponent(ArticleComponent);
      const htmlElement: HTMLElement = fixture.nativeElement
        .querySelector('[data-article-image]');

      expect(htmlElement.classList.contains('article-img-top')).toBeTruthy();
    });

    it('with a default image', () => {
      const fixture = TestBed.createComponent(ArticleComponent);
      const htmlElement: HTMLElement = fixture.nativeElement.querySelector('[data-article-image]');

      expect(htmlElement.getAttribute('defaultImage')).toEqual('assets/images/loading.gif');
    });

    it('with an alt', () => {
      const title = 'a title';
      const fixture = TestBed.createComponent(ArticleComponent);
      const component = fixture.componentInstance;
      component.article = Builder<Article>().title(title).build();
      fixture.detectChanges();
      const htmlElement: HTMLImageElement = fixture.nativeElement.querySelector('[data-article-image]');

      expect(htmlElement.alt).toEqual(title);
    });

    it('with a lazy loaded image', () => {
      const id = '123';
      const expectedImageUrl = `https://djarticles.s3.eu-west-3.amazonaws.com/${id}.jpeg`;

      const fixture = TestBed.createComponent(ArticleComponent);
      const component = fixture.componentInstance;
      component.article = Builder<Article>().id(id).build();

      fixture.detectChanges();

      expect(component.lazyLoad).toEqual(expectedImageUrl);
    });
  });

  it('should have an article body', () => {
    const fixture = TestBed.createComponent(ArticleComponent);
    const htmlElement: HTMLElement = fixture.nativeElement.querySelector('[data-article-body]');

    expect(htmlElement).toBeTruthy();
  });

  it('should display an article title', () => {
    const title = 'a title';
    const fixture = TestBed.createComponent(ArticleComponent);
    const component = fixture.componentInstance;
    component.article = Builder<Article>().title(title).build();
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement.querySelector('[data-article-title]');

    expect(htmlElement.textContent).toBe(title);
  });

  it('should display an article publication date', () => {
    const date = 'Mar 13, 2006';
    const fixture = TestBed.createComponent(ArticleComponent);
    const component = fixture.componentInstance;
    component.article = Builder<Article>().publicationDate(moment("2006-03-13").toDate()).build();
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement.querySelector('[data-article-date]');

    expect(htmlElement.textContent).toBe(date);
  });

  it('should display a line', () => {
    const fixture = TestBed.createComponent(ArticleComponent);

    const htmlElement: HTMLElement = fixture.nativeElement.querySelector('[data-article-bar]');

    expect(htmlElement.classList.contains('article-bar')).toBeTruthy();
  });

  it('should display an introduction', () => {
    const introduction = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nulla dapibus erat dictum.';
    const fixture = TestBed.createComponent(ArticleComponent);
    const component = fixture.componentInstance;
    component.article = Builder<Article>().introduction(introduction).build();
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement.querySelector('[data-article-introduction]');

    expect(htmlElement.textContent).toContain(introduction);
  });

  describe('article link', () => {
    it('should display the link to the article', () => {
      const url = 'http://www.linktoarticle.com/';
      const fixture = TestBed.createComponent(ArticleComponent);
      const component = fixture.componentInstance;
      component.article = Builder<Article>().url(url).build();
      fixture.detectChanges();

      const htmlElement: HTMLAnchorElement = fixture.nativeElement.querySelector('[data-article-url]');

      expect(htmlElement.href).toEqual(url);
    });

    it('should display text to read more', () => {
      const url = 'Read more';
      const fixture = TestBed.createComponent(ArticleComponent);

      const htmlElement: HTMLAnchorElement = fixture.nativeElement.querySelector('[data-article-url]');

      expect(htmlElement.textContent).toEqual(url);
    });
  });
});
