import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SoftwareCraftsmanshipCardComponent} from './software-craftsmanship-card.component';

describe('SoftwareCraftsmanshipCardComponent', () => {
  let component: SoftwareCraftsmanshipCardComponent;
  let fixture: ComponentFixture<SoftwareCraftsmanshipCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareCraftsmanshipCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareCraftsmanshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
