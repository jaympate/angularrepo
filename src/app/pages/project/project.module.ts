import {NgModule} from '@angular/core';
import {ProjectComponent} from './project.component';
import {ProjectCardComponent} from './project.card.component';
import {ProjectTriangleComponent} from './project.triangle.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    ProjectComponent,
    ProjectCardComponent,
    ProjectTriangleComponent
  ]
})
export class ProjectModule {

}
