import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {MockComponent} from 'ng-mocks';
import {TranslatePipeMock} from './translation/translate.pipe.mock';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let translateServiceSpyObject: TranslateService;

  beforeEach(() => {
    translateServiceSpyObject = jasmine.createSpyObj('translateServiceSpyObject', ['setDefaultLang']);


    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TranslatePipeMock,
        MockComponent(LanguageSelectorComponent)
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceSpyObject
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should set the default language to English', () => {
    expect(translateServiceSpyObject.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('translated welcome message should be displayed', () => {
    const EXPECTED_WEBSITE_WELCOME_MESSAGE = 'website.welcome.message.translated';

    const websiteWelcomeMessage = getWebsiteWelcomeMessage();

    expect(websiteWelcomeMessage).toBe(EXPECTED_WEBSITE_WELCOME_MESSAGE);
  });

  it('should contain the language selector component', () => {
    const languageSelectorComponent = getLanguageSelectorComponent();

    expect(languageSelectorComponent).not.toBeNull();
  });


  function getWebsiteWelcomeMessage(): string {
    return nativeElement.querySelector('div').textContent.trim();
  }

  function getLanguageSelectorComponent(): LanguageSelectorComponent {
    return fixture.debugElement
      .query(By.directive(LanguageSelectorComponent))
      .componentInstance as LanguageSelectorComponent;

  }
});
