import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {VisionComponent} from '../vision/vision.component';
import {CvComponent} from '../cv/cv.component';
import {TimelineComponent} from '../timeline/timeline.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'vision', component: VisionComponent},
      {path: 'cv', component: CvComponent},
      {path: 'timeline', component: TimelineComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
