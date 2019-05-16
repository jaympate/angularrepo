import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {LanguageService} from '../translation/language-service';
import {of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let nativeElement: HTMLElement;

  let translateServiceSpyObject: TranslateService;
  let languageServiceSpyObject: LanguageService;

  beforeEach(async(() => {
    translateServiceSpyObject = jasmine.createSpyObj('translateServiceSpyObject', ['use']);
    languageServiceSpyObject = jasmine.createSpyObj('languageServiceSpyObject', ['getLanguages']);
    languageServiceSpyObject.getLanguages['and'].returnValue(of(['en', 'nl', 'fr']));

    TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: languageServiceSpyObject
        },
        {
          provide: TranslateService,
          useValue: translateServiceSpyObject
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

  it('should display a button for every available language', () => {
    const expectedLanguages = ['en', 'nl', 'fr'];
    const languageChangeButtonValues = getLanguageChangeButtons()
      .map(languageChangeButton => languageChangeButton.textContent.trim());

    expect(languageChangeButtonValues).toEqual(expectedLanguages);
  });

  function getLanguageChangeButtons(): HTMLButtonElement[] {
    return Array.from(nativeElement.querySelectorAll('.change-language-button')) as HTMLButtonElement[];
  }
});
