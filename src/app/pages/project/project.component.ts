import {Component} from '@angular/core';
import {Project} from './project';
import {ProjectService} from './project.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-projects',
  template: `
    <div class="container-fluid pt-2">
      <div class="project-wrapper">
        <h1>{{ 'projects.title' | translate }}</h1>
        <div class="card">
          <div class="card-body">
            <p class="pb-2">{{ 'projects.description' | translate }}</p>
            <div *ngIf="projects$ | async as projects" class="projects">
              <div class="projects-line"></div>
              <ng-container *ngFor="let project of projects; let index = index">
                <app-projects-card
                  [left]="isEven(index)"
                  [project]="project"
                ></app-projects-card>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
      `
      .project-wrapper {
        padding-left: 10%;
        padding-right: 10%;
      }

      .projects {
        position: relative;
      }

      .projects:before,
      .projects:after {
        content: ' ';
        display: table;
      }

      .projects:after {
        clear: both;
      }

      /* This is the vertical line: didn't put this in a ::before so we can hide it on a small screen using bootstrap class. */
      .projects-line {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -0.25%;
        height: 100%;
        width: 0.5%;
        background: #757575;
      }

      li a:hover {
        text-decoration: none;
      }

      /* Small Devices */
      @media only screen and (max-width: 768px) {
        .projects-line {
          display: none;
        }

        .project-wrapper {
          padding-left: unset;
          padding-right: unset;
        }
      }
    `
  ]
})
export class ProjectComponent {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.projects$ = projectService.getProjects$();
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}
