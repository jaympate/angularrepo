import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockComponent, MockDirective, MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {HeaderComponent} from './header/header.component';
import {RouterOutlet} from '@angular/router';

describe('AppComponent', () => {
  let helper: AppComponentHelper;

  beforeEach(createTestingModule);
  beforeEach(createHelper);

  it('should instantiate the header component', () => {
    expect(helper.getHeaderComponent()).toBeTruthy();
  });

  class AppComponentHelper {
    private element: HTMLElement;
    private fixture: ComponentFixture<AppComponent>;

    constructor() {
      this.fixture = TestBed.createComponent(AppComponent);
      this.element = this.fixture.nativeElement;
      this.fixture.detectChanges();
    }

    getHeaderComponent(): MockedComponent<HeaderComponent> {
      return this.fixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;
    }
  }

  function createTestingModule(): void {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(HeaderComponent),
        MockDirective(RouterOutlet)
      ]
    });
  }

  function createHelper(): void {
    helper = new AppComponentHelper();
  }
});
