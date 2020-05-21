import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BlogpostService} from './blogpost.service';
import {TranslateServiceFacade} from '../../../translation/translate.service.facade';
import {BehaviorSubject} from 'rxjs';
import {Blogpost} from './blogpost';
import {Builder} from 'builder-pattern';

describe('BlogpostService', () => {
  let blogpostService: BlogpostService;
  const currentLanguageSubject = new BehaviorSubject<string>(undefined);
  const blogpostSubject = new BehaviorSubject<Blogpost[]>(undefined);
  let currentLanguage: string;

  beforeEach(() => {
    const get = jest.fn().mockReturnValue(blogpostSubject.asObservable());
    const getTranslationKnowingTheyAreLoaded = jest
      .fn()
      .mockImplementation((title: string) => title + '.' + currentLanguage);
    const getCurrentLanguage$ = jest
      .fn()
      .mockReturnValue(currentLanguageSubject.asObservable());

    TestBed.configureTestingModule({
      providers: [
        BlogpostService,
        {
          provide: HttpClient,
          useValue: { get },
        },
        {
          provide: TranslateServiceFacade,
          useValue: { getTranslationKnowingTheyAreLoaded, getCurrentLanguage$ },
        },
      ],
    });
  });

  describe('constructor', () => {
    it('retrieves the blogposts from backend url `https://dj-website-backend.herokuapp.com/api/blogpost`', () => {
      const httpClient = TestBed.inject(HttpClient);
      blogpostService = TestBed.inject(BlogpostService);

      expect(
        httpClient.get
      ).toHaveBeenCalledWith(
        'https://dj-website-backend.herokuapp.com/api/blogpost',
        { headers: expect.any(HttpHeaders) }
      );
    });
  });

  describe('getBlogposts$', () => {
    it('does not emit anything before translations are loaded', fakeAsync(() => {
      let dataEmitted;

      const aFrontendBlogpost = Builder<Blogpost>()
        .title('my frontend blogpost')
        .url('www.medium.com/life-is-fun')
        .publicationDate(new Date('2020-03-21'))
        .category('frontend')
        .build();

      blogpostService = TestBed.inject(BlogpostService);

      blogpostSubject.next([aFrontendBlogpost]);

      blogpostService
        .getBlogposts$()
        .subscribe((actualBlogposts) => (dataEmitted = actualBlogposts));
      tick();

      expect(dataEmitted).toBeUndefined();
    }));

    it('returns translated blogposts (e.g. for English translations)', fakeAsync(() => {
      let dataEmitted;

      currentLanguage = 'en';

      const aFrontendBlogpost = Builder<Blogpost>()
        .title('my frontend blogpost')
        .url('www.medium.com/life-is-fun')
        .publicationDate(new Date('2020-03-21'))
        .category('frontend')
        .build();
      const aBackendBlogpost = Builder<Blogpost>()
        .title('my backend blogpost')
        .publicationDate(new Date('2020-02-15'))
        .category('backend')
        .build();
      const untranslatedBlogposts = [aFrontendBlogpost, aBackendBlogpost];

      currentLanguageSubject.next(currentLanguage);
      blogpostSubject.next(untranslatedBlogposts);

      blogpostService = TestBed.inject(BlogpostService);

      blogpostService
        .getBlogposts$()
        .subscribe((actualBlogposts) => (dataEmitted = actualBlogposts));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "category": "frontend",
            "publicationDate": 2020-03-21T00:00:00.000Z,
            "title": "my frontend blogpost.en",
            "url": "www.medium.com/life-is-fun",
          },
          Object {
            "category": "backend",
            "publicationDate": 2020-02-15T00:00:00.000Z,
            "title": "my backend blogpost.en",
          },
        ]
      `);
    }));

    it('re-translates correctly (e.g. from English to French)', fakeAsync(() => {
      let dataEmitted;

      blogpostService = TestBed.inject(BlogpostService);
      blogpostSubject.next([
        Builder<Blogpost>()
          .title('my frontend blogpost')
          .url('www.medium.com/life-is-fun')
          .publicationDate(new Date('2020-03-21'))
          .category('frontend')
          .build(),
        Builder<Blogpost>()
          .title('my backend blogpost')
          .publicationDate(new Date('2020-02-15'))
          .category('backend')
          .build(),
      ]);

      currentLanguage = 'nl';
      currentLanguageSubject.next(currentLanguage);

      blogpostService
        .getBlogposts$()
        .subscribe((actualBlogposts) => (dataEmitted = actualBlogposts));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "category": "frontend",
            "publicationDate": 2020-03-21T00:00:00.000Z,
            "title": "my frontend blogpost.nl",
            "url": "www.medium.com/life-is-fun",
          },
          Object {
            "category": "backend",
            "publicationDate": 2020-02-15T00:00:00.000Z,
            "title": "my backend blogpost.nl",
          },
        ]
      `);

      currentLanguage = 'fr';
      currentLanguageSubject.next(currentLanguage);

      blogpostService
        .getBlogposts$()
        .subscribe((actualBlogposts) => (dataEmitted = actualBlogposts));
      tick();

      expect(dataEmitted).toMatchInlineSnapshot(`
        Array [
          Object {
            "category": "frontend",
            "publicationDate": 2020-03-21T00:00:00.000Z,
            "title": "my frontend blogpost.fr",
            "url": "www.medium.com/life-is-fun",
          },
          Object {
            "category": "backend",
            "publicationDate": 2020-02-15T00:00:00.000Z,
            "title": "my backend blogpost.fr",
          },
        ]
      `);
    }));
  });
});
