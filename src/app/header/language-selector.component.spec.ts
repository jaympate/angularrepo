import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {LanguageService} from '../translation/language.service';
import {of} from 'rxjs';
import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';
import {Languages} from '../translation/languages';
import {TestHTMLElementHelper} from '../testing/TestHTMLElementHelper';
import SpyObj = jasmine.SpyObj;

describe('LanguageSelectorComponent', () => {
  const languages = Languages.from('en', ['en', 'fr', 'nl']);
  const languages$ = of(languages);

  let languageServiceMock: SpyObj<LanguageService>;
  let languageSelectorComponentHelper: LanguageSelectorComponentHelper;

  beforeEach(configureTestingModule);
  beforeEach(mockLanguageService);
  beforeEach(createHelper);

  it('should show a button with the current language in uppercase', () => {
    const expectedText = languages.current.toUpperCase();

    const actualChangeLanguageButtonText = languageSelectorComponentHelper.getChangeLanguageButtonText();
    expect(actualChangeLanguageButtonText).toBe(expectedText);
  });

  it('should create a button for every other language', () => {
    const expectedLanguages = languages.other;

    const actualLanguages = languageSelectorComponentHelper.getLanguages();
    expect(actualLanguages).toEqual(expectedLanguages);
  });

  class LanguageSelectorComponentHelper {
    constructor() {
      this.fixture = TestBed.createComponent(LanguageSelectorComponent);
      this.element = this.fixture.nativeElement;
      this.fixture.detectChanges();
    }

    private fixture: ComponentFixture<LanguageSelectorComponent>;
    private element: HTMLElement;

    getLanguages(): string[] {
      return this.changeLanguageButtonComponents.map(changeLanguageButtonComponent => changeLanguageButtonComponent.language);
    }

    private get changeLanguageButtonComponents() {
      return this.fixture.debugElement
        .queryAll(By.directive(ChangeLanguageButtonComponent))
        .map(debugElement => debugElement.componentInstance as ChangeLanguageButtonComponent);
    }

    private get changeLanguageButton(): HTMLButtonElement {
      return this.element.querySelector('.changeLanguageButton') as HTMLButtonElement;
    }

    getChangeLanguageButtonText(): string {
      return TestHTMLElementHelper.textContent(this.changeLanguageButton);
    }
  }

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(ChangeLanguageButtonComponent),
        TranslatePipeMock,
        LanguageSelectorComponent
      ],
      providers: [
        LanguageService
      ]
    });
  }

  function mockLanguageService(): void {
    languageServiceMock = jasmine.createSpyObj<LanguageService>('languageServiceMock', ['getCurrentAndOtherLanguages$']);
    languageServiceMock.getCurrentAndOtherLanguages$.and.returnValue(languages$);
    TestBed.overrideProvider(LanguageService, {useValue: languageServiceMock});
  }


  function createHelper(): void {
    languageSelectorComponentHelper = new LanguageSelectorComponentHelper();
  }
});
