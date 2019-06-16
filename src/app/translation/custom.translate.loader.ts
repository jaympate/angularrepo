import {TranslateLoader} from '@ngx-translate/core';
import {TranslationService} from './translation.service';
import {Translation} from './translation';
import {Observable} from 'rxjs';


export class CustomTranslateLoader implements TranslateLoader {
  constructor(private translationService: TranslationService) {
  }

  getTranslation(language: string): Observable<Translation> {
    return this.translationService.getTranslation(language);
  }
}
