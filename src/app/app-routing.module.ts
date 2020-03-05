import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VisionComponent} from './pages/vision/vision.component';
import {CvComponent} from './pages/cv/cv.component';
import {DataComponent} from './pages/data/data.component';
import {ProjectComponent} from './pages/project/project.component';
import {BlogpostComponent} from './pages/blogpost/blogpost.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'vision', component: VisionComponent},
      {path: 'cv', component: CvComponent},
      {path: 'projects', component: ProjectComponent},
      {path: 'blogposts', component: BlogpostComponent},
      {path: 'data', component: DataComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
