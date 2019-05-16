import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Translation} from './translation';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translationCache: Map<string, Observable<Translation>> = new Map();

  constructor(private httpClient: HttpClient) {

  }

  getTranslation(language: string): Observable<Translation> {
    return this.getStaticTranslation(language);
  }

  private getStaticTranslation(language: string): Observable<Translation> {
    if (!this.translationCache.has(language)) {
      this.translationCache.set(language, this.getLanguageTranslationsRequest(language));
    }
    return this.translationCache.get(language);
  }

  private getLanguageTranslationsRequest(language: string): Observable<Translation> {
    return this.httpClient.get<Translation>(`./assets/translation/${language}.json`);
  }
}
