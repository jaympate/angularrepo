import {Component} from '@angular/core';
import {LanguageService} from '../../translation/language.service';
import {Observable} from 'rxjs';
import {Languages} from '../../translation/languages';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  currentAndOtherLanguage$: Observable<Languages>;

  constructor(private languageService: LanguageService) {
    this.currentAndOtherLanguage$ = this.languageService.getCurrentAndOtherLanguages$();
  }
}
