import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslationService} from './translation/translation.service';
import {HttpClientModule} from '@angular/common/http';
import {LanguageSelectorComponent} from './header/language-selector.component';
import {ChangeLanguageButtonComponent} from './header/change-language-button.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {HomeComponent} from './home/home.component';
import {VisionComponent} from './vision/vision.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SoftwareCraftsmanshipCardComponent} from './vision/software-craftsmanship-card/software-craftsmanship-card.component';
import {CvComponent} from './cv/cv.component';
import {TimelineComponent} from './timeline/timeline.component';
import {TimelineCardComponent} from './timeline/timeline.card.component';
import {TimelineTriangleComponent} from './timeline/timeline.triangle.component';
import {CustomTranslateLoaderFactory} from './translation/custom.translate.loader.factory';
import {HeaderComponent} from './header/header.component';
import {AppComponent} from './app.component';
import {NavOptionsComponent} from './vision/nav.options.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    ChangeLanguageButtonComponent,
    HeaderComponent,
    HomeComponent,
    VisionComponent,
    SoftwareCraftsmanshipCardComponent,
    CvComponent,
    TimelineComponent,
    TimelineCardComponent,
    TimelineTriangleComponent,
    NavOptionsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: CustomTranslateLoaderFactory,
        deps: [
          TranslationService
        ]
      }
    })
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
