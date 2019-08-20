import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VisionComponent} from './vision.component';
import {TranslatePipeMock} from '../translation/translate.pipe.mock';
import {SoftwareCraftsmanshipCardComponent} from './software-craftsmanship-card/software-craftsmanship-card.component';
import {MockComponent} from 'ng-mocks';

describe('VisionComponent', () => {
  let component: VisionComponent;
  let fixture: ComponentFixture<VisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisionComponent,
        MockComponent(SoftwareCraftsmanshipCardComponent),
        TranslatePipeMock
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
