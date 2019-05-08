import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslationService} from './translation/translation.service';
import {CustomTranslateLoader} from './translation/custom.translate.loader';
import {HttpClientModule} from '@angular/common/http';

export function CustomTranslateLoaderFactory(languageTranslationsService: TranslationService) {
  return new CustomTranslateLoader(languageTranslationsService);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: CustomTranslateLoaderFactory,
        deps: [TranslationService]
      }
    })
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
