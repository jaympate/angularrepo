import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
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
import {LanguageSelectorComponent} from '../navbar/language-selector.component';

describe('AppRoutingModule', () => {
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;
  let appComponent: AppComponent;

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
    });
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(appComponent).toBeTruthy();
  });

  it('navigate to "" redirects you to the home path', async(() => {
    const expectedHomePath = '/';

    fixture.ngZone.run(() => {
      router.navigate([expectedHomePath]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const actualCurrentPath = getCurrentPath();
        expect(actualCurrentPath).toBe(expectedHomePath);
      });
    });
  }));

  it('navigate to "vision" redirects you to the vision path', async(() => {
    const expectedVisionPath = '/vision';

    fixture.ngZone.run(() => {
      router.navigate([expectedVisionPath]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const actualCurrentPath = getCurrentPath();
        expect(actualCurrentPath).toBe(expectedVisionPath);
      });
    });
  }));

  it('navigate to "cv" redirects you to the cv path', async(() => {
    const expectedCvPath = '/cv';

    fixture.ngZone.run(() => {
      router.navigate([expectedCvPath]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const actualCurrentPath = getCurrentPath();
        expect(actualCurrentPath).toBe(expectedCvPath);
      });
    });
  }));

  it('navigate to "timeline" redirects you to the timeline path', fakeAsync(() => {
    const expectedTimelinePath = '/timeline';

    fixture.ngZone.run(() => {
      router.navigate([expectedTimelinePath]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const actualCurrentPath = getCurrentPath();
        expect(actualCurrentPath).toBe(expectedTimelinePath);
      });
    });
  }));

  function getCurrentPath(): string {
    return location.path();
  }
});
