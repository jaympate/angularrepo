import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslatePipeMock} from './translation/translate.pipe.mock';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let nativeElement: HTMLElement;
  let translateService: TranslateService;

  beforeEach(() => {
    translateService = jasmine.createSpyObj('translateServiceMock', ['setDefaultLang', 'use']);
    translateService.setDefaultLang['and'].returnValue(of('en'));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TranslatePipeMock
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateService
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('translated welcome message should be displayed', () => {
    const EXPECTED_WEBSITE_WELCOME_MESSAGE = 'website.welcome.message.translated';

    const websiteWelcomeMessage = getWebsiteWelcomeMessage();

    expect(websiteWelcomeMessage).toBe(EXPECTED_WEBSITE_WELCOME_MESSAGE);
  });

  function getWebsiteWelcomeMessage(): string {
    return nativeElement.querySelector('div').textContent.trim();
  }
});
