import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {MockComponent} from 'ng-mocks';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavOptionsComponent} from './nav-options/nav.options.component';
import {By} from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [
        HeaderComponent,
        MockComponent(LanguageSelectorComponent),
        MockComponent(NavOptionsComponent)
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('navigation bar is collapsed by default', () => {
    fixture.detectChanges();
    expect(component.collapse).toBe(true);
  });

  it('the toggle button should allow to undo collapse', () => {
    fixture.detectChanges();

    getToggleButton().click();
    fixture.detectChanges();

    expect(component.collapse).toBe(false);
  });

  it('should allow to collapse by the nav options component on navigation', () => {
    component.collapse = false;
    fixture.detectChanges();

    getNavOptionsComponent().navigated.emit();

    fixture.detectChanges();

    expect(component.collapse).toBe(true);
  });

  it('the toggle button should allow to collapse', () => {
    component.collapse = false;
    fixture.detectChanges();

    getToggleButton().click();
    fixture.detectChanges();

    expect(component.collapse).toBe(true);
  });

  function getToggleButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('[data-toggle]');
  }

  function getNavOptionsComponent(): NavOptionsComponent {
    return fixture.debugElement.query(By.directive(NavOptionsComponent))
      .componentInstance;
  }
});
