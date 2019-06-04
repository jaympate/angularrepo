import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {LanguageService} from '../translation/language-service';
import {of} from 'rxjs';
import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let nativeElement: HTMLElement;

  let languageServiceSpyObject: LanguageService;

  beforeEach(async(() => {
    languageServiceSpyObject = jasmine.createSpyObj('languageServiceSpyObject', ['getLanguages$']);
    languageServiceSpyObject.getLanguages$['and'].returnValue(of(['en', 'nl', 'fr']));

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

  it('should show a button with translated text', () => {
    const expectedChangeLanguageButtonText = 'website.change.language.translated';

    const actualChangeLanguageButtonText = trimTextContent(getChangeLanguageButton());
    expect(actualChangeLanguageButtonText).toBe(expectedChangeLanguageButtonText);
  });

  it('should create a button for every language', () => {
    const expectedLanguages = ['en', 'nl', 'fr'];

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
});
