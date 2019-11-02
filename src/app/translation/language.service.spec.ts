import {TestBed} from '@angular/core/testing';
import {LanguageService} from './language.service';
import {CookieService} from 'ngx-cookie-service';
import {TranslateServiceFacade} from './translate.service.facade';
import {Languages} from './languages';
import SpyObj = jasmine.SpyObj;

describe('LanguageService', () => {
  const defaultLanguage = 'en';
  const supportedLanguages = [defaultLanguage, 'fr', 'it', 'ch', 'nl'];

  beforeEach(configureTestingModule);

  beforeEach(clearCookies);

  describe('Constructor', () => {
    it('No language is provided by a cookie, language service is initialised with the default language', () => {
      const languageService: LanguageService = TestBed.get(LanguageService);

      assertCurrentAndOtherLanguagesToEqual(languageService, defaultLanguage);
    });

    it('Language is provided by a cookie, language service is initialised with the cookie language', () => {
      const cookieLanguage = 'nl';
      TestBed.get(CookieService).set('website.locale', cookieLanguage);

      const languageService: LanguageService = TestBed.get(LanguageService);

      assertCurrentAndOtherLanguagesToEqual(languageService, cookieLanguage);
    });

    it('persists the cookie language to the translate service', () => {
      const cookieLanguage = 'fr';
      TestBed.get(CookieService).set('website.locale', cookieLanguage);

      TestBed.get(LanguageService);

      const translateServiceDecoratorMock: SpyObj<TranslateServiceFacade> = TestBed.get(TranslateServiceFacade);
      expect(translateServiceDecoratorMock.use).toHaveBeenCalledWith(cookieLanguage);
    });
  });

  describe('Changing language', () => {
    it('updates the language services current language to a new language', () => {
      const newLanguage = 'fr';

      TestBed.get(LanguageService).updateCurrentLanguage(newLanguage);

      assertCurrentAndOtherLanguagesToEqual(TestBed.get(LanguageService), newLanguage);
    });

    it('persists the new language to our translate service', () => {
      const newLanguage = 'fr';

      TestBed.get(LanguageService).updateCurrentLanguage(newLanguage);

      const translateServiceDecoratorMock: SpyObj<TranslateServiceFacade> = TestBed.get(TranslateServiceFacade);
      expect(translateServiceDecoratorMock.use).toHaveBeenCalledWith(newLanguage);
    });

    it('updates the cookie in the cookie service for the new language', () => {
      const cookieLanguage = 'ch';
      const newLanguage = 'fr';
      TestBed.get(CookieService).set('website.locale', cookieLanguage);

      TestBed.get(LanguageService).updateCurrentLanguage(newLanguage);

      const actualCookieLanguage = TestBed.get(CookieService).get('website.locale');
      expect(actualCookieLanguage).toEqual(newLanguage);
    });
  });

  const mockedTranslateServiceDecorator: SpyObj<TranslateServiceFacade> = getMockedTranslateServiceFacade();

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        {
          provide: TranslateServiceFacade,
          useValue: mockedTranslateServiceDecorator
        }
      ]
    });
  }

  function getMockedTranslateServiceFacade(): SpyObj<TranslateServiceFacade> {
    const mock: SpyObj<TranslateServiceFacade> = jasmine.createSpyObj<TranslateServiceFacade>('translateServiceDecoratorMock', [
      'getDefaultLanguage',
      'getSupportedLanguages',
      'use'
    ]);
    mock.getDefaultLanguage.and.returnValue(defaultLanguage);
    mock.getSupportedLanguages.and.returnValue(supportedLanguages);
    return mock;
  }

  function clearCookies(): void {
    TestBed.get(CookieService).deleteAll();
  }

  function assertCurrentAndOtherLanguagesToEqual(languageService: LanguageService, expectedCurrentLanguage: string): void {
    languageService.getCurrentAndOtherLanguages$().subscribe(currentAndOtherLanguages => {
      expect(currentAndOtherLanguages).toEqual(Languages.from(expectedCurrentLanguage, supportedLanguages));
    });
  }
});
