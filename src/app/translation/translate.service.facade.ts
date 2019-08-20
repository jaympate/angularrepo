import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';


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
}
