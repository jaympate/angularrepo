import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects-triangle',
  template: `
    <div [ngClass]="left ? 'triangle-left' : 'triangle-right'"></div>
  `,
  styleUrls: ['project.triangle.component.scss']
})
export class ProjectTriangleComponent {
  @Input()
  left: boolean;
}
