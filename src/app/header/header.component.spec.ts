import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { LanguageSelectorComponent } from "./language-selector/language-selector.component";
import { MockComponent } from "ng-mocks";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavOptionsComponent } from "./nav-options/nav.options.component";
import { By } from "@angular/platform-browser";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [
        HeaderComponent,
        MockComponent(LanguageSelectorComponent),
        MockComponent(NavOptionsComponent),
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("navigation bar is collapsed by default", () => {
    fixture.detectChanges();
    expect(component.isCollapsed).toBe(true);
    expect(fixture).toMatchInlineSnapshot(`
      <app-header
        isCollapsed={[Function Boolean]}
      >
        <header
          class="header"
        >
          <nav
            class="navbar navbar-expand-lg navbar-light"
          >
            <span
              class="navbar-brand text"
            >
               Dieter Jordens 
            </span>
            <button
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              class="navbar-toggler toggleNavBar"
              data-target="#navbarSupportedContent"
              data-toggle="collapse"
              type="button"
            >
              <span
                class="navbar-toggler-icon"
              />
            </button>
            <div
              class="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <app-nav-options
                class="mr-auto"
              />
              <app-language-selector />
            </div>
          </nav>
        </header>
      </app-header>
    `);
  });

  it("the toggle button should allow to undo collapse", () => {
    fixture.detectChanges();

    getToggleButton().click();
    fixture.detectChanges();

    expect(component.isCollapsed).toBe(false);
    expect(fixture).toMatchInlineSnapshot(`
      <app-header
        isCollapsed="false"
      >
        <header
          class="header"
        >
          <nav
            class="navbar navbar-expand-lg navbar-light"
          >
            <span
              class="navbar-brand text"
            >
               Dieter Jordens 
            </span>
            <button
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
              class="navbar-toggler toggleNavBar"
              data-target="#navbarSupportedContent"
              data-toggle="collapse"
              type="button"
            >
              <span
                class="navbar-toggler-icon"
              />
            </button>
            <div
              class="collapse navbar-collapse show"
              id="navbarSupportedContent"
            >
              <app-nav-options
                class="mr-auto"
              />
              <app-language-selector />
            </div>
          </nav>
        </header>
      </app-header>
    `);
  });

  it("should allow to collapse by the nav options component on navigation", () => {
    component.isCollapsed = false;
    fixture.detectChanges();

    getNavOptionsComponent().navigated.emit();

    fixture.detectChanges();

    expect(component.isCollapsed).toBe(true);
  });

  it("the toggle button should allow to collapse", () => {
    component.isCollapsed = false;
    fixture.detectChanges();

    getToggleButton().click();
    fixture.detectChanges();

    expect(component.isCollapsed).toBe(true);
  });

  function getToggleButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector("[data-toggle]");
  }

  function getNavOptionsComponent(): NavOptionsComponent {
    return fixture.debugElement.query(By.directive(NavOptionsComponent))
      .componentInstance;
  }
});
