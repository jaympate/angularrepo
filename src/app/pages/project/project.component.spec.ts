import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectComponent} from './project.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {ProjectCardComponent} from './project.card.component';

describe('ProjectsComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'projects', component: ProjectComponent}
        ])
      ],
      declarations: [
        MockComponent(ProjectCardComponent),
        ProjectComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
