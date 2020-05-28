import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VisionComponent} from './pages/vision/vision.component';
import {CvComponent} from './pages/cv/cv.component';
import {DataComponent} from './pages/data/data.component';
import {ProjectComponent} from './pages/project/project.component';
import {BooksComponent} from './pages/book/books.component';
import {BlogpostsComponent} from './pages/blogpost/blogposts.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'vision', component: VisionComponent},
      {path: 'cv', component: CvComponent},
      {path: 'projects', component: ProjectComponent},
      {path: 'blogposts', component: BlogpostsComponent},
      {path: 'books', component: BooksComponent},
      {path: 'certificates', component: DataComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
