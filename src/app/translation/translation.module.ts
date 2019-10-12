import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CustomTranslateLoaderFactory} from './custom.translate.loader.factory';
import {TranslationService} from './translation.service';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports: [
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
  exports: [
    TranslateModule
  ]
})
export class TranslationModule {

}
