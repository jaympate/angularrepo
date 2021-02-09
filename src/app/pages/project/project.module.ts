import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectCardComponent } from './project.card.component';
import { ProjectTriangleComponent } from './project.triangle.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectComponent,
    ProjectCardComponent,
    ProjectTriangleComponent
  ]
})
export class ProjectModule {}
