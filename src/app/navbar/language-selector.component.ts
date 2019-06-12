import {Component} from '@angular/core';
import {LanguageService} from '../translation/language-service';
import {Observable} from 'rxjs';
import {Languages} from '../translation/languages';

@Component({
  selector: 'app-language-selector',
  template: `
    <ng-container *ngIf="languages$ | async as languages">
      <div ngbDropdown class="d-inline-block dropdown">
        <button class="btn btn-outline-success dropdown-toggle changeLanguageButton" id="languageSelectorDropdown"
                ngbDropdownToggle>{{languages.currentLanguage | uppercase}}</button>
        <div ngbDropdownMenu aria-labelledby="languageSelectorDropdown" class="dropdown-menu">
          <app-change-language-button *ngFor="let language of languages.other"
                                      [language]="language"></app-change-language-button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
      `
      .dropdown-menu {
        min-width: 0;
      }
    `
  ]
})
export class LanguageSelectorComponent {
  languages$: Observable<Languages>;

  constructor(private languageService: LanguageService) {
    this.languages$ = this.languageService.getLanguages$();
  }
}
