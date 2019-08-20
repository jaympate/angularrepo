import {Component, Input} from '@angular/core';
import {LanguageService} from '../translation/language.service';

@Component({
  selector: 'app-change-language-button',
  styleUrls: ['./change-language-button.component.scss'],
  template: `
    <button class="dropdown-item changeLanguage" (click)="useLanguage(language)">{{language}}</button>
  `
})
export class ChangeLanguageButtonComponent {

  @Input()
  language: string;

  constructor(private languageService: LanguageService) {
  }

  useLanguage(language: string): void {
    this.languageService.updateCurrentLanguage(language);
  }
}
