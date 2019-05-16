import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly languages: Array<string> = ['en', 'nl', 'fr'];

  getLanguages(): Observable<Array<string>> {
    return of(this.languages);
  }
}

