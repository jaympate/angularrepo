import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavOptionsComponent} from './nav.options.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';

describe("NavOptionsComponent", () => {
  let component: NavOptionsComponent;
  let fixture: ComponentFixture<NavOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavOptionsComponent, TranslatePipeMock],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOptionsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should render", () => {
    fixture.detectChanges();
    expect(fixture).toMatchInlineSnapshot(`
      <app-nav-options
        navigated={[Function EventEmitter]}
        navigationOptions={[Function Array]}
        router={[Function Router]}
      >
        <ul
          class="navbar-nav"
        >


          <li
            class="nav-item active"
          >
            <a
              class="nav-link navigation"
              data-navigation-option="website.home"
              href="/"
            >
              website.home.translated
            </a>
          </li>

          <li
            class="nav-item"
          >
            <a
              class="nav-link navigation"
              data-navigation-option="website.vision"
              href="/vision"
            >
              website.vision.translated
            </a>
          </li>

          <li
            class="nav-item"
          >
            <a
              class="nav-link navigation"
              data-navigation-option="website.cv"
              href="/cv"
            >
              website.cv.translated
            </a>
          </li>

          <li
            class="nav-item"
          >
            <a
              class="nav-link navigation"
              data-navigation-option="website.projects"
              href="/projects"
            >
              website.projects.translated
            </a>
          </li>

          <li
            class="nav-item"
          >
            <a
              class="nav-link navigation"
              data-navigation-option="website.blogposts"
              href="/blogposts"
            >
              website.blogposts.translated
            </a>
          </li>

          <li
            class="nav-item"
          >
            <a
              class="nav-link navigation"
              data-navigation-option="website.data"
              href="/data"
            >
              website.data.translated
            </a>
          </li>
        </ul>
      </app-nav-options>
    `);
  });

  it("should emit event when navigated to a navigation option", () => {
    const navigationOption = `website.vision`;

    const spy = jest.spyOn(component.navigated, "emit");
    fixture.detectChanges();

    findNavigationOption(navigationOption).click();

    expect(spy).toHaveBeenCalled();
  });

  function findNavigationOption(navigationOption: string) {
    return fixture.nativeElement.querySelector(
      `[data-navigation-option="${navigationOption}"]`
    );
  }
});
