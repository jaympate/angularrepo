// import {TestBed} from '@angular/core/testing';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {MockComponent} from 'ng-mocks';
// import {ChangeLanguageButtonComponent} from '../../../header/change-language-button.component';
// import {TranslateServiceFacade} from '../../../translation/translate.service.facade';
// import {of} from 'rxjs';
// import {Blogpost} from './blogpost';
// import {BlogpostService} from './blogpost.service';
// import SpyObj = jasmine.SpyObj;
// import {Book} from '../book/book';
//
//
// describe('BlogpostService', () => {
//   beforeEach(configureTestingModule);
//
//
//   describe('getBlogposts', () => {
//     it('returns all blogposts translated', async () => {
//       const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
//
//       const blogpostService: BlogpostService = TestBed.get(BlogpostService);
//       const blogposts = blogpostService.getBlogposts$().toPromise();
//
//       const request = httpMock.expectOne('https://dj-website-backend.herokuapp.com/api/blogpost');
//       expect(request.request.method).toBe('GET');
//       request.flush(BLOGPOSTS_FROM_BACKEND);
//       expect(await blogposts).toEqual(getblo());
//
//       httpMock.verify();
//     });
//   });
//
//   function configureTestingModule(): void {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule
//       ],
//       declarations: [
//         MockComponent(ChangeLanguageButtonComponent)
//       ],
//       providers: [
//         {
//           provide: TranslateServiceFacade,
//           useValue: getMockedTranslateServiceDecorator()
//         }
//       ]
//     });
//   }
//
//   const BLOGPOSTS_FROM_BACKEND = [
//     {
//       title: '1st title',
//       creationDate: '',
//       url: 'http://bla.com'
//     },
//     {
//       title: '2nd title',
//       creationDate: '',
//       url: 'http://bla.com'
//     },
//     {
//       title: '3rd title',
//       creationDate: '',
//       url: 'http://bla.com'
//     }
//   ];
//
//   function getBlogpostTranslations(): string[] {
//     return BLOGPOSTS_FROM_BACKEND.flatMap(blogpost => [blogpost.title].map(x => x + '.translated'));
//   }
//
//
//   function getMockedTranslateServiceDecorator(): SpyObj<TranslateServiceFacade> {
//     const mock: SpyObj<TranslateServiceFacade> = jasmine.createSpyObj<TranslateServiceFacade>('translateServiceDecoratorMock', [
//       'getCurrentLanguage$',
//       'getTranslationKnowingTheyAreLoaded'
//     ]);
//     mock.getCurrentLanguage$.and.returnValue(of('fr'));
//     mock.getTranslationKnowingTheyAreLoaded.and.returnValues(...getBlogpostTranslations());
//     return mock;
//   }
// });
