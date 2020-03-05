import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LanguageSelectorComponent} from './language-selector.component';
import {LanguageService} from '../../translation/language.service';
import {ChangeLanguageButtonComponent} from './change-language-button/change-language-button.component';
import {BehaviorSubject} from 'rxjs';
import {Languages} from '../../translation/languages';
import {Builder} from 'builder-pattern';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let currentAndOtherLanguagesSubject = new BehaviorSubject<Languages>(null);

  beforeEach(() => {
    const currentAndOtherLanguages$ = jest.fn().mockReturnValue(currentAndOtherLanguagesSubject.asObservable());

    TestBed.configureTestingModule({
      declarations: [
        LanguageSelectorComponent,
        ChangeLanguageButtonComponent
      ],
      providers: [{
        provide: LanguageService,
        useValue: {
          getCurrentAndOtherLanguages$: currentAndOtherLanguages$
        }
      }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should render the current language and the other languages to choose from', () => {
    const languages = Builder<Languages>()
      .current('en')
      .other(['nl', 'fr'])
      .build();
    currentAndOtherLanguagesSubject.next(languages);

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
