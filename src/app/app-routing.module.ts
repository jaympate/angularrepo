import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VisionComponent} from './pages/vision/vision.component';
import {CvComponent} from './pages/cv/cv.component';
import {ProjectComponent} from './pages/project/project.component';
import {BooksComponent} from './pages/book/books.component';
import {ArticlesComponent} from './pages/article/articles.component';
import {CertificateOverviewComponent} from './pages/certificate/certificate.overview.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'vision', component: VisionComponent },
    { path: 'cv', component: CvComponent },
    { path: 'projects', component: ProjectComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'books', component: BooksComponent },
    { path: 'data', component: CertificateOverviewComponent },
    { path: '**', redirectTo: '' }
], { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
