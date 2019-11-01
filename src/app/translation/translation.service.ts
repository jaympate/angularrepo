import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BackendTranslationService} from './backend-translation.service';
import {BackendTranslations} from './backend.translations';
import {TranslationKeyValues} from './translation.key.values';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private staticTranslationCache: Map<string, Promise<TranslationKeyValues>> = new Map();
  private backendTranslationCache: Promise<BackendTranslations>;

  constructor(private httpClient: HttpClient, private backendTranslationService: BackendTranslationService) {
  }

  getTranslation(language: string): Observable<TranslationKeyValues> {
    return combineLatest([this.getStaticTranslation(language), this.getBackendTranslation(language)])
      .pipe(
        map(([staticTranslations, backendTranslations]) => ({...staticTranslations, ...backendTranslations}))
      );
  }

  // TODO: add test to verify that every translation file contains the same amount of entries

  private getStaticTranslation(language: string): Promise<TranslationKeyValues> {
    if (!this.staticTranslationCache.has(language)) {
      this.staticTranslationCache.set(language, this.getLanguageTranslationsRequest(language));
    }
    return this.staticTranslationCache.get(language);
  }

  private getLanguageTranslationsRequest(language: string): Promise<TranslationKeyValues> {
    return this.httpClient.get<TranslationKeyValues>(`./assets/translation/${language}.json`).toPromise();
  }

  private getBackendTranslation(language: string): Promise<TranslationKeyValues> {
    if (!this.backendTranslationCache) {
      this.backendTranslationCache = this.backendTranslationService.getBackendTranslations$().toPromise();
    }
    return this.backendTranslationCache.then(backendTranslations => backendTranslations.translations[language]);
  }
}
