import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {VisionComponent} from './vision/vision.component';
import {AppComponent} from './app.component';
import {CvComponent} from './cv/cv.component';
import {TimelineComponent} from './timeline/timeline.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';

describe('AppRoutingModule', () => {
  let helper: AppRoutingModuleHelper;

  beforeEach(configureTestingModule);
  beforeEach(createHelper);

  it('navigate to "/" redirects you to the home path', async () => {
    const expectedHomePath = '/';

    await helper.ngZoneToPreventWarning.run(() => AppRoutingModuleHelper.navigateToRoute(expectedHomePath));

    expect(AppRoutingModuleHelper.actualCurrentPath).toBe(expectedHomePath);
  });

  it('navigate to "vision" redirects you to the vision path', async () => {
    const expectedVisionPath = '/vision';

    await helper.ngZoneToPreventWarning.run(() => AppRoutingModuleHelper.navigateToRoute(expectedVisionPath));

    expect(AppRoutingModuleHelper.actualCurrentPath).toBe(expectedVisionPath);
  });

  it('navigate to "cv" redirects you to the cv path', async () => {
    const expectedCvPath = '/cv';

    await helper.ngZoneToPreventWarning.run(() => AppRoutingModuleHelper.navigateToRoute(expectedCvPath));

    expect(AppRoutingModuleHelper.actualCurrentPath).toBe(expectedCvPath);
  });

  it('navigate to "timeline" redirects you to the timeline path', async () => {
    const expectedTimelinePath = '/timeline';

    await helper.ngZoneToPreventWarning.run(() => AppRoutingModuleHelper.navigateToRoute(expectedTimelinePath));

    expect(AppRoutingModuleHelper.actualCurrentPath).toBe(expectedTimelinePath);
  });

  class AppRoutingModuleHelper {
    private fixture: ComponentFixture<AppComponent>;
    private component: AppComponent;

    constructor() {
      this.fixture = TestBed.createComponent(AppComponent);
      this.component = this.fixture.componentInstance;
      this.fixture.detectChanges();
    }

    get ngZoneToPreventWarning() {
      return this.fixture.ngZone;
    }

    static navigateToRoute(route: string): void {
      const router: Router = TestBed.get(Router);
      router.navigate([route]);
    }

    static get actualCurrentPath(): string {
      const location: Location = TestBed.get(Location);
      return location.path();
    }
  }

  function configureTestingModule(): void {
    const mockedHomeComponent = MockComponent(HomeComponent);
    const mockedVisionComponent = MockComponent(VisionComponent);
    const mockedCvComponent = MockComponent(CvComponent);
    const mockedTimelineComponent = MockComponent(TimelineComponent);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', component: mockedHomeComponent},
          {path: 'vision', component: mockedVisionComponent},
          {path: 'cv', component: mockedCvComponent},
          {path: 'timeline', component: mockedTimelineComponent}
        ])
      ],
      declarations: [
        mockedHomeComponent,
        mockedVisionComponent,
        mockedCvComponent,
        mockedTimelineComponent,
        MockComponent(HeaderComponent),
        AppComponent
      ]
    });
  }


  function createHelper(): void {
    helper = new AppRoutingModuleHelper();
  }
});
