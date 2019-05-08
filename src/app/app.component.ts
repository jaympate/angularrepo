import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="content">{{ 'website.welcome.message' | translate }}</div>

    <button (click)="useLanguage('nl')">nl</button>
    <button (click)="useLanguage('en')">en</button>
    <button (click)="useLanguage('fr')">fr</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
  }

  useLanguage(language: string) {
    this.translateService.use(language);
  }
}
