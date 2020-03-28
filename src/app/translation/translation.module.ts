import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CustomTranslateLoaderFactory} from './custom.translate.loader.factory';
import {TranslationService} from './translation.service';
import {NgxLocalStorageModule} from 'ngx-localstorage';

@NgModule({
  imports: [
    NgxLocalStorageModule.forRoot(),
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
  exports: [
    TranslateModule
  ]
})
export class TranslationModule {

}
