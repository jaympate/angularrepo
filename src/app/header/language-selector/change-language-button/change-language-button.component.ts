import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../translation/language.service';
import { GoogleAnalyticsService } from '../../../google.analytics.service';

@Component({
  selector: 'app-change-language-button',
  styleUrls: ['./change-language-button.component.scss'],
  templateUrl: './change-language-button.component.html'
})
export class ChangeLanguageButtonComponent {
  @Input()
  language: string;

  constructor(
    private languageService: LanguageService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  useLanguage(language: string): void {
    this.languageService.updateCurrentLanguage(language);
    this.googleAnalyticsService.click('language_change', language);
  }
}
