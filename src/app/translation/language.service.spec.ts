import {async, TestBed} from '@angular/core/testing';
import {LanguageService} from './language-service';
import {MockComponent} from 'ng-mocks';
import {ChangeLanguageButtonComponent} from '../navbar/change-language-button.component';
import {TranslatePipeMock} from './translate.pipe.mock';
import {LanguageSelectorComponent} from '../navbar/language-selector.component';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import SpyObj = jasmine.SpyObj;

describe('LanguageService', () => {
  let translateServiceSpyObject: SpyObj<TranslateService>;
  let cookieServiceSpyObject: SpyObj<CookieService>;

  beforeEach(async(() => {
    translateServiceSpyObject = jasmine.createSpyObj<TranslateService>('translateServiceSpyObject', ['setDefaultLang', 'use']);
    cookieServiceSpyObject = jasmine.createSpyObj<CookieService>('cookieServiceSpyObject', ['set', 'get']);

    TestBed.configureTestingModule({
      declarations: [
        MockComponent(ChangeLanguageButtonComponent),
        TranslatePipeMock,
        LanguageSelectorComponent
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceSpyObject
        },
        {
          provide: CookieService,
          useValue: cookieServiceSpyObject
        }
      ]
    });
  }));

  it('should be created', () => {
    const service: LanguageService = TestBed.get(LanguageService);
    expect(service).toBeTruthy();
  });
});
