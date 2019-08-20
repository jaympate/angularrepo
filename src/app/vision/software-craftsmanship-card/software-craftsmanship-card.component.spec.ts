import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SoftwareCraftsmanshipCardComponent} from './software-craftsmanship-card.component';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';

describe('SoftwareCraftsmanshipCardComponent', () => {
  let component: SoftwareCraftsmanshipCardComponent;
  let fixture: ComponentFixture<SoftwareCraftsmanshipCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SoftwareCraftsmanshipCardComponent,
        TranslatePipeMock
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareCraftsmanshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
