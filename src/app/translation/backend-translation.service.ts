import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BackendTranslations,
  TranslationsForLanguage
} from './backend.translations';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Builder } from 'builder-pattern';
import { TranslationKeyValues } from './translation.key.values';

@Injectable({
  providedIn: 'root'
})
export class BackendTranslationService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = `www.dieterjordens.com:10002/api/translations`;

  getBackendTranslations$() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46RWVuRWVudm91ZGlnV2FjaHR3b29yZA=='
      })
    };
    return this.http
      .get<BackendTranslations>(this.baseUrl, httpOptions)
      .pipe(
        catchError(() =>
          of(
            Builder<BackendTranslations>()
              .translations(
                Builder<TranslationsForLanguage>()
                  .en(Builder<TranslationKeyValues>().build())
                  .nl(Builder<TranslationKeyValues>().build())
                  .build()
              )
              .build()
          )
        )
      );
  }
}
