import { TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from './translation.service';
import { Observable } from 'rxjs';
import { TranslationKeyValues } from './translation.key.values';

export class CustomTranslateLoader implements TranslateLoader {
  private constructor(private translationService: TranslationService) {}

  static of(translationService: TranslationService) {
    return new CustomTranslateLoader(translationService);
  }

  getTranslation(language: string): Observable<TranslationKeyValues> {
    return this.translationService.getTranslation(language);
  }
}
