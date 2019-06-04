import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';
import {MockComponent} from 'ng-mocks';
import {VisionComponent} from '../vision/vision.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let location: Location;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', component: HomeComponent},
          {path: 'vision', component: MockComponent(VisionComponent)}
        ])
      ],
      declarations: [
        MockComponent(VisionComponent),
        HomeComponent,
        TranslatePipeMock
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should show the translated welcome message', () => {
    const expectedTranslatedWelcomeMessageText = 'website.welcome.message.translated';

    const actualWelcomeMessageText = trimTextContent(getWelcomeMessage());
    expect(actualWelcomeMessageText).toBe(expectedTranslatedWelcomeMessageText);
  });

  it('should show the translated introduction message', () => {
    const expectedTranslatedIntroductionMessageText = 'website.introduction.message.translated';

    const actualIntroductionMessageText = trimTextContent(getIntroductionMessage());
    expect(actualIntroductionMessageText).toBe(expectedTranslatedIntroductionMessageText);
  });

  it('should show the translated details message', () => {
    const expectedTranslatedDetailsMessageText = 'website.details.message.translated';

    const actualDetailsMessageText = trimTextContent(getDetailsMessage());
    expect(actualDetailsMessageText).toBe(expectedTranslatedDetailsMessageText);
  });

  it('should show the translated learn more button', () => {
    const expectedTranslatedLearnMoreText = 'website.learn.more.about.my.vision.translated';

    const actualLearnMoreButtonText = trimTextContent(getLearnMoreButton());
    expect(actualLearnMoreButtonText).toBe(expectedTranslatedLearnMoreText);
  });

  it('clicking on the "learn more" button redirects you to the vision path', fakeAsync(() => {
    const expectedVisionPath = '/vision';
    clickLearnMoreButton();

    const actualCurrentPath = getCurrentPath();
    expect(actualCurrentPath).toBe(expectedVisionPath);
  }));

  function getLearnMoreButton(): HTMLButtonElement {
    return element.querySelector('.learnMore') as HTMLButtonElement;
  }

  function getWelcomeMessage(): HTMLElement {
    return element.querySelector('.welcomeMessage') as HTMLElement;
  }

  function getIntroductionMessage(): HTMLElement {
    return element.querySelector('.introductionMessage') as HTMLElement;
  }

  function getDetailsMessage(): HTMLElement {
    return element.querySelector('.detailsMessage') as HTMLElement;
  }

  function trimTextContent(htmlElement: HTMLElement): string {
    return htmlElement.textContent.trim();
  }

  function getCurrentPath(): string {
    return location.path();
  }

  function clickLearnMoreButton(): void {
    const visionButton = getLearnMoreButton();
    visionButton.click();
    fixture.detectChanges();
    tick();
  }
});
