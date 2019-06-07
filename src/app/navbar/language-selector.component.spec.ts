import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {Languages, LanguageService} from '../translation/language-service';
import {of} from 'rxjs';
import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';
import SpyObj = jasmine.SpyObj;

describe('LanguageSelectorComponent', () => {
  const languages: Languages = createLanguages('en', ['fr', 'nl']);
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let nativeElement: HTMLElement;
  let languageServiceSpyObject: SpyObj<LanguageService>;

  beforeEach(async(() => {
    languageServiceSpyObject = jasmine.createSpyObj<LanguageService>('languageServiceSpyObject', ['getLanguages$']);
    languageServiceSpyObject.getLanguages$.and.returnValue(of(languages));

    TestBed.configureTestingModule({
      declarations: [
        MockComponent(ChangeLanguageButtonComponent),
        TranslatePipeMock,
        LanguageSelectorComponent
      ],
      providers: [
        {
          provide: LanguageService,
          useValue: languageServiceSpyObject
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should show a button with the current language in uppercase', () => {
    const expectedText = languages.currentLanguage.toUpperCase();

    const actualChangeLanguageButtonText = trimTextContent(getChangeLanguageButton());
    expect(actualChangeLanguageButtonText).toBe(expectedText);
  });

  it('should create a button for every other language', () => {
    const expectedLanguages = languages.other;

    const actualLanguages = getLanguages();
    expect(actualLanguages).toEqual(expectedLanguages);
  });

  function getLanguages(): string[] {
    return fixture.debugElement
      .queryAll(By.directive(ChangeLanguageButtonComponent))
      .map(debugElement => debugElement.componentInstance as ChangeLanguageButtonComponent)
      .map(changeLanguageButtonComponent => changeLanguageButtonComponent.language);
  }

  function getChangeLanguageButton(): HTMLButtonElement {
    return nativeElement.querySelector('.changeLanguageButton') as HTMLButtonElement;
  }

  function trimTextContent(htmlElement: HTMLElement): string {
    return htmlElement.textContent.trim();
  }

  function createLanguages(currentLanguage: string, other: Array<string>): Languages {
    return {currentLanguage, other};
  }
});
