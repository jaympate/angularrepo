import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {Component} from '@angular/core';
import {LanguageService} from '../translation/language.service';
import {TestHTMLElementHelper} from '../_test/TestHTMLElementHelper';
import SpyObj = jasmine.SpyObj;

describe('ChangeLanguageButtonComponent', () => {
  const defaultLanguage = 'en';
  let helper: AppChangeLanguageButtonComponentHelper;
  let languageServiceMock: SpyObj<LanguageService>;

  beforeEach(configureTestingModule);
  beforeEach(mockLanguageService);
  beforeEach(createHelper);

  it('should show initial test language', () => {
    const actualLanguage = helper.changeLanguageButtonText;
    expect(actualLanguage).toEqual(defaultLanguage);
  });

  it('should be able to change test language', () => {
    const expectedLanguage = 'nl';

    helper.changeInputLanguage(expectedLanguage);

    const actualLanguage = helper.changeLanguageButtonText;
    expect(actualLanguage).toEqual(expectedLanguage);
  });

  it('should use the input language on click', () => {
    helper.clickChangeLanguageButton();

    expect(languageServiceMock.updateCurrentLanguage).toHaveBeenCalledWith(defaultLanguage);
  });


  class AppChangeLanguageButtonComponentHelper {
    private element: HTMLElement;
    private fixture: ComponentFixture<TestHostComponent>;
    private component: TestHostComponent;

    constructor() {
      this.fixture = TestBed.createComponent(TestHostComponent);
      this.element = this.fixture.nativeElement;
      this.component = this.fixture.componentInstance;
      this.fixture.detectChanges();
    }

    changeInputLanguage(language: string): void {
      this.component.language = language;
      this.fixture.detectChanges();
    }

    get changeLanguageButton(): HTMLButtonElement {
      return this.element.querySelector('.changeLanguage') as HTMLButtonElement;
    }

    get changeLanguageButtonText() {
      return TestHTMLElementHelper.textContent(this.changeLanguageButton);
    }

    clickChangeLanguageButton(): void {
      this.changeLanguageButton.click();
      this.fixture.detectChanges();
    }
  }

  @Component({
    selector: 'app-host-component',
    template: `
      <app-change-language-button [language]="language"></app-change-language-button>`
  })
  class TestHostComponent {
    language = defaultLanguage;
  }

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      declarations: [
        ChangeLanguageButtonComponent,
        TestHostComponent
      ]
    });
  }

  function mockLanguageService(): void {
    languageServiceMock = jasmine.createSpyObj('languageServiceMock', ['updateCurrentLanguage']);
    TestBed.overrideProvider(LanguageService, {useValue: languageServiceMock});
  }

  function createHelper(): void {
    helper = new AppChangeLanguageButtonComponentHelper();
  }
});
