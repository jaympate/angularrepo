import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {LanguageService} from '../../../translation/language.service';

describe('ChangeLanguageButtonComponent', () => {
  let component: ChangeLanguageButtonComponent;
  let fixture: ComponentFixture<ChangeLanguageButtonComponent>;
  let updateCurrentLanguage: jest.Mock;

  beforeEach(() => {
    updateCurrentLanguage = jest.fn();
    TestBed.configureTestingModule({
      declarations: [ChangeLanguageButtonComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            updateCurrentLanguage: updateCurrentLanguage
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLanguageButtonComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should update the current language', () => {
    fixture.componentInstance.language = 'fr';
    fixture.detectChanges();

    findChangeLanguageButton().click();
    fixture.detectChanges();

    expect(updateCurrentLanguage).toHaveBeenCalledWith('fr');
  });

  function findChangeLanguageButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('[data-change-language-button]');
  }
});
