import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {LanguageService} from '../translation/language-service';
import {of} from 'rxjs';
import {ChangeLanguageButtonComponent} from './change-language-button/change-language-button.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';

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
        LanguageSelectorComponent,
        MockComponent(ChangeLanguageButtonComponent)
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
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create a button for every language', () => {
    const expectedLanguages = ['en', 'nl', 'fr'];
    const languages = getChangeLanguageButtonComponents()
      .map(languageChangeButton => languageChangeButton.language);

    expect(languages).toEqual(expectedLanguages);
  });

  function getChangeLanguageButtonComponents(): ChangeLanguageButtonComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(ChangeLanguageButtonComponent))
      .map(debugElement => debugElement.componentInstance) as ChangeLanguageButtonComponent[];
  }
});
