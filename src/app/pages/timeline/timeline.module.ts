import {NgModule} from '@angular/core';
import {TimelineComponent} from './timeline.component';
import {TimelineCardComponent} from './timeline.card.component';
import {TimelineTriangleComponent} from './timeline.triangle.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimelineComponent,
    TimelineCardComponent,
    TimelineTriangleComponent
  ]
})
export class TimelineModule {

}
