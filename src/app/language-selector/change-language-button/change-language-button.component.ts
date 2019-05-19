import {Component, Input} from '@angular/core';
import {LanguageService} from '../../translation/language-service';

@Component({
  selector: 'app-change-language-button',
  template: `
    <button class="dropdown-item" ngbDropdownItem (click)="useLanguage(language)">
      {{language}}
    </button>
  `,
  styles: []
})
export class ChangeLanguageButtonComponent {

  @Input()
  language: string;

  constructor(private languageService: LanguageService) {
  }

  useLanguage(language: string): void {
    this.languageService.setCurrentLanguage(language);
  }
}
