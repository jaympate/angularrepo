import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeLanguageButtonComponent} from './change-language-button.component';
import {TranslateService} from '@ngx-translate/core';
import {By} from '@angular/platform-browser';
import {Component, ViewChild} from '@angular/core';

describe('ChangeLanguageButtonComponent', () => {
  const INITIAL_LANGUAGE = 'fr';

  let component: ChangeLanguageButtonComponent;
  let fixture: ComponentFixture<ChangeLanguageButtonComponent>;

  let translateServiceSpyObject: TranslateService;

  beforeEach(async(() => {
    translateServiceSpyObject = jasmine.createSpyObj('translateServiceSpyObject', ['use']);

    TestBed.configureTestingModule({
      declarations: [
        ChangeLanguageButtonComponent,
        TestHostComponent
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceSpyObject
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLanguageButtonComponent);
    component = fixture.componentInstance;
    component.language = INITIAL_LANGUAGE;
    fixture.detectChanges();
  });

  it('should use the input language on click', () => {
    const buttonElement = getButtonElement();

    buttonElement.click();

    expect(translateServiceSpyObject.use).toHaveBeenCalledWith(INITIAL_LANGUAGE);
  });

  function getButtonElement(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
  }

  @Component({
    selector: 'app-host-component',
    template: `
      <app-change-language-button [language]="'en'"></app-change-language-button>`
  })
  class TestHostComponent {
    @ViewChild(ChangeLanguageButtonComponent)
    changeLanguageButtonComponent: ChangeLanguageButtonComponent;
  }

  describe('TestHostComponent', () => {
    let hostComponent: TestHostComponent;
    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('should show initial test language', () => {
      expect(hostFixture.nativeElement.querySelector('button').innerText.trim()).toEqual('en');
    });

    it('should be able to change test language', () => {
      const expectedLanguage = 'nl';

      changeInputLanguage(expectedLanguage);

      expect(hostFixture.nativeElement.querySelector('button').innerText.trim()).toEqual(expectedLanguage);
    });

    function changeInputLanguage(language: string): void {
      hostComponent.changeLanguageButtonComponent.language = language;
      hostFixture.detectChanges();
    }
  });
});
