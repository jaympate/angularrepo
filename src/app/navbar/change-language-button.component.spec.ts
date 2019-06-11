import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {Component} from '@angular/core';
import {LanguageService} from '../translation/language-service';
import SpyObj = jasmine.SpyObj;

describe('ChangeLanguageButtonComponent', () => {
  const defaultLanguage = 'en';

  let languageServiceSpyObj: SpyObj<LanguageService>;
  let testHostComponentInstance: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  @Component({
    selector: 'app-host-component',
    template: `
      <app-change-language-button [language]="language"></app-change-language-button>`
  })
  class TestHostComponent {
    language = defaultLanguage;
  }

  beforeEach(async(() => {
    languageServiceSpyObj = jasmine.createSpyObj('languageServiceSpyObj', ['setCurrentLanguage']);

    TestBed.configureTestingModule({
      declarations: [
        ChangeLanguageButtonComponent,
        TestHostComponent
      ],
      providers: [
        {
          provide: LanguageService,
          useValue: languageServiceSpyObj
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponentInstance = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should show initial test language', () => {
    const actualLanguage = trimTextContent(getChangeLanguageButton());
    expect(actualLanguage).toEqual(defaultLanguage);
  });

  it('should be able to change test language', () => {
    const expectedLanguage = 'nl';

    changeInputLanguage(expectedLanguage);

    const actualLanguage = trimTextContent(getChangeLanguageButton());
    expect(actualLanguage).toEqual(expectedLanguage);
  });

  it('should use the input language on click', () => {
    const changeLanguageButton = getChangeLanguageButton();

    changeLanguageButton.click();
    expect(languageServiceSpyObj.setCurrentLanguage).toHaveBeenCalledWith(defaultLanguage);
  });

  function changeInputLanguage(language: string): void {
    testHostComponentInstance.language = language;
    fixture.detectChanges();
  }

  function getChangeLanguageButton(): HTMLButtonElement {
    return element.querySelector('.changeLanguage') as HTMLButtonElement;
  }

  function trimTextContent(htmlElement: HTMLElement): string {
    return htmlElement.textContent.trim();
  }
});
