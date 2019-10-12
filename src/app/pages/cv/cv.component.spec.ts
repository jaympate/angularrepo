import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CvComponent} from './cv.component';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {TestHTMLElementHelper} from '../../_test/TestHTMLElementHelper';

describe('CvComponent', () => {
  let helper: CvComponentHelper;

  beforeEach(configureTestingModule);
  beforeEach(createHelper);

  it('shows name', () => {
    expect(TestHTMLElementHelper.textContent(helper.name)).toEqual('Dieter Jordens');
  });

  // TODO: write a lot of tests.

  function configureTestingModule(): void {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'cv', component: CvComponent}
          ]
        )
      ],
      declarations: [
        CvComponent,
        TranslatePipeMock
      ]
    });
  }

  class CvComponentHelper {
    private element: HTMLElement;
    private fixture: ComponentFixture<CvComponent>;

    constructor() {
      this.fixture = TestBed.createComponent(CvComponent);
      this.element = this.fixture.nativeElement;
      this.fixture.detectChanges();
    }

    get name(): HTMLElement {
      return this.element.querySelector('.name') as HTMLElement;
    }
  }

  function createHelper(): void {
    helper = new CvComponentHelper();
  }
});
