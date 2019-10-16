import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Languages} from './languages';
import {TranslateServiceFacade} from './translate.service.facade';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_COOKIE = 'website.locale';
  private currentAndOtherLanguagesBehaviorSubject: BehaviorSubject<Languages>;

  constructor(private translateService: TranslateServiceFacade, private cookieService: CookieService) {
    const currentLanguage = cookieService.get(this.LANGUAGE_COOKIE) || this.translateService.getDefaultLanguage();
    this.currentAndOtherLanguagesBehaviorSubject = new BehaviorSubject<Languages>(this.getLanguages(currentLanguage));
    this.translateService.use(currentLanguage);
  }

  getCurrentAndOtherLanguages$(): Observable<Languages> {
    return this.currentAndOtherLanguagesBehaviorSubject.asObservable();
  }

  updateCurrentLanguage(currentLanguage: string): void {
    this.cookieService.set(this.LANGUAGE_COOKIE, currentLanguage);
    this.translateService.use(currentLanguage);
    this.currentAndOtherLanguagesBehaviorSubject.next(this.getLanguages(currentLanguage));
  }

  private getLanguages(currentLanguage: string): Languages {
    return Languages.from(currentLanguage, this.translateService.getSupportedLanguages());
  }
}
