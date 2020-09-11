import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateServiceFacade} from '../../translation/translate.service.facade';
import {map, tap} from 'rxjs/operators';
import {Certificate} from './certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private untranslatedCertificates: Certificate[];
  private readonly translatedCertificates$: Observable<Certificate[]>;
  private readonly baseUrl = `https://80.201.59.168:10002/api/certificates`;

  constructor(
    private http: HttpClient,
    private translateService: TranslateServiceFacade
  ) {
    const currentLanguage$ = translateService.getCurrentLanguage$();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46d2FjaHR3b29yZFZvb3JCb2VrZW4='
      })
    };
    const certificates$: Observable<Certificate[]> = this.http.get<Certificate[]>(this.baseUrl, httpOptions);

    this.translatedCertificates$ = combineLatest([
      certificates$,
      currentLanguage$
    ]).pipe(
      map(([certificates]) => certificates),
      tap((certificates) => this.cacheCertificates(certificates)),
      map(() => this.translateCertificates())
    );
  }

  getCertificates$(): Observable<Certificate[]> {
    return this.translatedCertificates$;
  }

  private cacheCertificates(certificates: Certificate[]) {
    if (!this.untranslatedCertificates) {
      this.untranslatedCertificates = certificates;
    }
  }

  private translateCertificates(): Certificate[] {
    return this.untranslatedCertificates.map((certificate) => ({
      ...certificate,
      name: this.translateService.getTranslationKnowingTheyAreLoaded(
        certificate.name
      )
    }));
  }
}
