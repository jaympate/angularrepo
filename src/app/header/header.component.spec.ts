import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {MockComponent} from 'ng-mocks';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavOptionsComponent} from './nav-options/nav.options.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, NoopAnimationsModule],
      declarations: [HeaderComponent, MockComponent(NavOptionsComponent)]
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
});
