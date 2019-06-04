import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {VisionComponent} from '../vision/vision.component';
import {AppComponent} from '../app.component';
import {CvComponent} from '../cv/cv.component';
import {TimelineComponent} from '../timeline/timeline.component';
import {HomeComponent} from '../home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';
import {LanguageSelectorComponent} from '../language-selector/language-selector.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        RouterTestingModule.withRoutes([
          {path: '', component: MockComponent(HomeComponent)},
          {path: 'vision', component: MockComponent(VisionComponent)},
          {path: 'cv', component: MockComponent(CvComponent)},
          {path: 'timeline', component: MockComponent(TimelineComponent)}
        ])
      ],
      declarations: [
        MockComponent(HomeComponent),
        MockComponent(VisionComponent),
        MockComponent(CvComponent),
        MockComponent(TimelineComponent),
        MockComponent(LanguageSelectorComponent),
        AppComponent,
        TranslatePipeMock
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
  });

  it('navigate to "" redirects you to the home path', fakeAsync(() => {
    const expectedHomePath = '/';

    navigateTo(expectedHomePath);

    const actualCurrentPath = getCurrentPath();
    expect(actualCurrentPath).toBe(expectedHomePath);
  }));

  it('navigate to "vision" redirects you to the vision path', fakeAsync(() => {
    const expectedVisionPath = '/vision';

    navigateTo(expectedVisionPath);

    const actualCurrentPath = getCurrentPath();
    expect(actualCurrentPath).toBe(expectedVisionPath);
  }));

  it('navigate to "cv" redirects you to the cv path', fakeAsync(() => {
    const expectedCvPath = '/cv';
    navigateTo(expectedCvPath);

    const actualCurrentPath = getCurrentPath();
    expect(actualCurrentPath).toBe(expectedCvPath);
  }));

  it('navigate to "timeline" redirects you to the timeline path', fakeAsync(() => {
    const expectedTimelinePath = '/timeline';

    navigateTo(expectedTimelinePath);

    const actualCurrentPath = getCurrentPath();
    expect(actualCurrentPath).toBe(expectedTimelinePath);
  }));

  function getCurrentPath(): string {
    return location.path();
  }

  function navigateTo(path: string): void {
    router.navigate([path]);
    tick();
  }
});
