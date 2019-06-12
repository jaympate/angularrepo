import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageSelectorComponent} from './navbar/language-selector.component';
import {MockComponent} from 'ng-mocks';
import {TranslatePipeMock} from './translation/translate.pipe.mock';
import {By} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let translateServiceSpyObject: TranslateService;

  beforeEach(async(() => {
    translateServiceSpyObject = jasmine.createSpyObj('translateServiceSpyObject', ['setDefaultLang']);

    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        RouterTestingModule
      ],
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
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should contain the language selector component', () => {
    const languageSelectorComponent = getLanguageSelectorComponent();

    expect(languageSelectorComponent).not.toBeNull();
  });


  function getLanguageSelectorComponent(): LanguageSelectorComponent {
    return fixture.debugElement
      .query(By.directive(LanguageSelectorComponent))
      .componentInstance as LanguageSelectorComponent;

  }
});
