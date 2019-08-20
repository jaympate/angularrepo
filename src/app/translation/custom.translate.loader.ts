import {TranslateLoader} from '@ngx-translate/core';
import {TranslationService} from './translation.service';
import {Observable} from 'rxjs';
import {Translation} from './translation';


export class CustomTranslateLoader implements TranslateLoader {
  private constructor(private translationService: TranslationService) {
  }

  static of(translationService: TranslationService) {
    return new CustomTranslateLoader(translationService);
  }

  getTranslation(language: string): Observable<Translation> {
    return this.translationService.getTranslation(language);
  }
}
