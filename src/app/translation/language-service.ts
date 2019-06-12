import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {Languages} from './languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly languageCookie = 'website.locale';
  readonly allSupportedLanguages: Array<string> = ['en', 'nl', 'fr'];

  private languagesBehaviorSubject: BehaviorSubject<Languages>;

  constructor(private translateService: TranslateService, private cookieService: CookieService) {
    const currentLanguage = cookieService.get(this.languageCookie) || this.allSupportedLanguages[0];

    this.translateService.setDefaultLang(currentLanguage);
    this.languagesBehaviorSubject = new BehaviorSubject<Languages>(this.getCurrentAndOtherLanguages(currentLanguage));
  }

  getLanguages$(): Observable<Languages> {
    return this.languagesBehaviorSubject.asObservable();
  }

  setCurrentLanguage(currentLanguage: string): void {
    this.translateService.use(currentLanguage);
    this.cookieService.set(this.languageCookie, currentLanguage);

    this.languagesBehaviorSubject.next(this.getCurrentAndOtherLanguages(currentLanguage));
  }

  private getCurrentAndOtherLanguages(currentLanguage: string): Languages {
    return {
      currentLanguage,
      other: this.allSupportedLanguages.filter(supportedLanguage => supportedLanguage !== currentLanguage)
    };
  }
}
