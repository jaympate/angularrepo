import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavOptionsComponent} from '../pages/vision/nav.options.component';
import {LanguageSelectorComponent} from './language-selector.component';
import {MockComponent, MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let helper: HeaderComponentHelper;

  beforeEach(configureTestingModule);
  beforeEach(createHelper);

  it('is collapsed on creation', () => {
    expect(helper.isCollapsed).toBe(true);
  });

  it('allows changing from collapsed to not collapsed', () => {
    helper.toggleNavBar();

    expect(helper.isCollapsed).toBe(false);
  });

  it('allows changing from not collapsed to collapsed', () => {
    helper.setIsNotCollapsed();
    helper.toggleNavBar();

    expect(helper.isCollapsed).toBe(true);
  });

  it('shows all navigation options', () => {
    expect(helper.navigationOptionsComponent).toBeTruthy();
  });

  it('shows the language selector', () => {
    expect(helper.languageSelectorComponent).toBeTruthy();
  });

  class HeaderComponentHelper {
    private fixture: ComponentFixture<HeaderComponent>;
    private element: HTMLElement;
    private component: HeaderComponent;

    constructor() {
      this.fixture = TestBed.createComponent(HeaderComponent);
      this.element = this.fixture.nativeElement;
      this.component = this.fixture.componentInstance;
      this.fixture.detectChanges();
    }

    setIsNotCollapsed() {
      this.component.isCollapsed = false;
      this.fixture.detectChanges();
    }

    get isCollapsed(): boolean {
      return this.component.isCollapsed;
    }

    toggleNavBar(): void {
      this.navBarToggleButton.click();
      this.fixture.detectChanges();
    }

    private get navBarToggleButton() {
      return this.element.querySelector('.toggleNavBar') as HTMLButtonElement;
    }

    get navigationOptionsComponent(): MockedComponent<NavOptionsComponent> {
      return this.fixture.debugElement.query(By.directive(NavOptionsComponent)).nativeElement;
    }

    get languageSelectorComponent(): MockedComponent<LanguageSelectorComponent> {
      return this.fixture.debugElement.query(By.directive(LanguageSelectorComponent)).nativeElement;
    }
  }

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      imports: [
        NgbModule
      ],
      declarations: [
        HeaderComponent,
        MockComponent(NavOptionsComponent),
        MockComponent(LanguageSelectorComponent)
      ]
    });
  }

  function createHelper(): void {
    helper = new HeaderComponentHelper();
  }
});
