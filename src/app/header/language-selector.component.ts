import {Component} from '@angular/core';
import {LanguageService} from '../translation/language.service';
import {Observable} from 'rxjs';
import {Languages} from '../translation/languages';

@Component({
  selector: 'app-language-selector',
  template: `
    <ng-container *ngIf="currentAndOtherLanguage$ | async as languages">
      <div ngbDropdown class="d-inline-block dropdown">
        <button class="btn btn-outline-dark dropdown-toggle changeLanguageButton" id="languageSelectorDropdown"
                ngbDropdownToggle>{{languages.current | uppercase}}</button>
        <div ngbDropdownMenu aria-labelledby="languageSelectorDropdown" class="dropdown-menu">
          <app-change-language-button *ngFor="let otherLanguage of languages.other" [language]="otherLanguage"></app-change-language-button>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  currentAndOtherLanguage$: Observable<Languages>;

  constructor(private languageService: LanguageService) {
    this.currentAndOtherLanguage$ = this.languageService.getCurrentAndOtherLanguages$();
  }
}
