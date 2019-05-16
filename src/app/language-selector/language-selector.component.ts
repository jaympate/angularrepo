import {Component} from '@angular/core';
import {LanguageService} from '../translation/language-service';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  template: `
    <ng-container *ngFor="let language of languages$ | async">
      <button class="change-language-button" (click)="useLanguage(language)">{{language}}</button>
    </ng-container>
  `,
  styles: []
})
export class LanguageSelectorComponent {

  languages$: Observable<Array<string>>;

  constructor(private languageService: LanguageService,
              private translateService: TranslateService) {
    this.languages$ = this.languageService.getLanguages();
  }

  useLanguage(language: string) {
    this.translateService.use(language);
  }
}
