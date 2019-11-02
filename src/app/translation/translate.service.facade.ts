import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TranslateServiceFacade {
  private readonly defaultLanguage = 'en';
  private readonly supportedLanguages: Array<string> = ['en', 'nl', 'fr'];

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.defaultLanguage);
  }

  getDefaultLanguage(): string {
    return this.translateService.getDefaultLang();
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  use(language: string) {
    this.translateService.use(language);
  }

  getCurrentLanguage$(): Observable<string> {
    return this.translateService.stream('current.language')
      .pipe(distinctUntilChanged());
  }

  getTranslationKnowingTheyAreLoaded(key: string): string {
    return this.translateService.instant(key);
  }
}
