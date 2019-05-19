import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly languageCookie = 'website.locale';
  readonly languages: Array<string> = ['en', 'nl', 'fr'];

  constructor(private translateService: TranslateService, private cookieService: CookieService) {
    const initialLanguage = cookieService.get(this.languageCookie) || this.languages[0];

    this.translateService.setDefaultLang(initialLanguage);
  }

  getLanguages$(): Observable<Array<string>> {
    return of(this.languages);
  }

  setCurrentLanguage(language: string): void {
    this.translateService.use(language);
    this.cookieService.set(this.languageCookie, language);
  }
}

