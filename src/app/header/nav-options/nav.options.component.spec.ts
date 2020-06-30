import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavOptionsComponent} from './nav.options.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';

describe('NavOptionsComponent', () => {
  let component: NavOptionsComponent;
  let fixture: ComponentFixture<NavOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavOptionsComponent, TranslatePipeMock]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOptionsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should emit event when navigated to a navigation option', () => {
    const navigationOption = `website.vision`;

    const spy = jest.spyOn(component.navigated, 'emit');
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
