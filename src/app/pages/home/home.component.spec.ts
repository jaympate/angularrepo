import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';
import {MockComponent} from 'ng-mocks';
import {VisionComponent} from '../vision/vision.component';
import {TestHTMLElementHelper} from '../../_test/TestHTMLElementHelper';

describe('HomeComponent', () => {
  let helper: HomeComponentHelper;

  beforeEach(configureTestingModule);
  beforeEach(createHelper);

  it('should show the translated welcome message in upper case', () => {
    const expectedTranslatedWelcomeMessageText = 'website.welcome.message.translated'.toUpperCase();

    expect(helper.welcomeMessageText).toBe(expectedTranslatedWelcomeMessageText);
  });

  it('should show the translated introduction message', () => {
    const expectedTranslatedIntroductionMessageText = 'website.introduction.message.translated';

    expect(helper.introductionMessageText).toBe(expectedTranslatedIntroductionMessageText);
  });

  it('should show the translated details message', () => {
    const expectedTranslatedDetailsMessageText = 'website.details.message.translated';

    expect(helper.detailsMessageText).toBe(expectedTranslatedDetailsMessageText);
  });

  it('should show the translated learn more button', () => {
    const expectedTranslatedLearnMoreText = 'website.learn.more.about.my.vision.translated';

    expect(helper.learnMoreButtonText).toBe(expectedTranslatedLearnMoreText);
  });

  it('clicking on the "learn more" button redirects you to the vision path', () => {
    const expectedVisionPath = '/vision';
    helper.clickLearnMoreButton();

    helper.resumeAfterAsynchronousEventOrChangeDetection.then(() => expect(TestBed.get(Location).path()).toBe(expectedVisionPath));
  });

  class HomeComponentHelper {
    private element: HTMLElement;
    private fixture: ComponentFixture<HomeComponent>;

    constructor() {
      this.fixture = TestBed.createComponent(HomeComponent);
      this.element = this.fixture.nativeElement;
      this.fixture.detectChanges();
    }

    private get learnMoreButton(): HTMLButtonElement {
      return this.element.querySelector('.learnMore') as HTMLButtonElement;
    }

    get learnMoreButtonText(): string {
      return TestHTMLElementHelper.textContent(this.learnMoreButton);
    }

    get welcomeMessageText(): string {
      const welcomeMessage = this.element.querySelector('.welcomeMessage') as HTMLElement;
      return TestHTMLElementHelper.textContent(welcomeMessage);
    }

    get introductionMessageText(): string {
      const introductionMessage = this.element.querySelector('.introductionMessage') as HTMLElement;
      return TestHTMLElementHelper.textContent(introductionMessage);
    }

    get detailsMessageText(): string {
      const detailsMessage = this.element.querySelector('.detailsMessage') as HTMLElement;
      return TestHTMLElementHelper.textContent(detailsMessage);
    }

    get resumeAfterAsynchronousEventOrChangeDetection(): Promise<any> {
      return this.fixture.whenStable();
    }

    clickLearnMoreButton(): void {
      this.learnMoreButton.click();
      this.fixture.detectChanges();
    }
  }

  function configureTestingModule(): void {
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
    });
  }

  function createHelper(): void {
    helper = new HomeComponentHelper();
  }
});
