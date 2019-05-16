import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslationService} from './translation/translation.service';
import {CustomTranslateLoader} from './translation/custom.translate.loader';
import {HttpClientModule} from '@angular/common/http';
import {TranslatePipeMock} from './translation/translate.pipe.mock';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';

export function CustomTranslateLoaderFactory(languageTranslationsService: TranslationService) {
  return new CustomTranslateLoader(languageTranslationsService);
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipeMock,
    LanguageSelectorComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
