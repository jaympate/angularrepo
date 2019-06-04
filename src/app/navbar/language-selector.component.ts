import {Component} from '@angular/core';
import {LanguageService} from '../translation/language-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-language-selector',
  template: `
    <div ngbDropdown class="d-inline-block dropdown">
      <button class="btn btn-outline-success dropdown-toggle changeLanguageButton" id="languageSelectorDropdown"
              ngbDropdownToggle>{{'website.change.language' | translate}}</button>
      <div ngbDropdownMenu aria-labelledby="languageSelectorDropdown" class="dropdown-menu">
        <ng-container *ngFor="let language of languages$ | async">
          <app-change-language-button [language]="language"></app-change-language-button>
        </ng-container>
      </div>
    </div>
  `,
  styles: []
})
export class LanguageSelectorComponent {

  languages$: Observable<Array<string>>;

  constructor(private languageService: LanguageService) {
    this.languages$ = this.languageService.getLanguages$();
  }
}
