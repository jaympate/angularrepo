import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './pages/home/home.module';
import { CvModule } from './pages/cv/cv.module';
import { ProjectModule } from './pages/project/project.module';
import { VisionModule } from './pages/vision/vision.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ArticleModule } from './pages/article/article.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookModule } from './pages/book/book.module';
import { CertificateModule } from './pages/certificate/certificate.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    AppRoutingModule,
    CvModule,
    ArticleModule,
    BookModule,
    CertificateModule,
    HomeModule,
    ProjectModule,
    VisionModule,
    FontAwesomeModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
