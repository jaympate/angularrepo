import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CvComponent} from './cv.component';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';
import {RouterTestingModule} from '@angular/router/testing';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
