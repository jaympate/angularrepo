import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule, TranslateModuleConfig} from '@ngx-translate/core';
import {TranslationService} from './translation/translation.service';
import {CustomTranslateLoader} from './translation/custom.translate.loader';
import {HttpClientModule} from '@angular/common/http';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {ChangeLanguageButtonComponent} from './language-selector/change-language-button/change-language-button.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SoftwareCraftsmanshipCardComponent} from './about/software-craftsmanship-card/software-craftsmanship-card.component';

export function CustomTranslateLoaderFactory(languageTranslationsService: TranslationService) {
  return new CustomTranslateLoader(languageTranslationsService);
}

const translateModuleConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: CustomTranslateLoaderFactory,
    deps: [
      TranslationService
    ]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    ChangeLanguageButtonComponent,
    HomeComponent,
    AboutComponent,
    SoftwareCraftsmanshipCardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot(translateModuleConfig)
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
