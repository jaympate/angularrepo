import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Certificate} from './certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly baseUrl = `https://www.dieterjordens.com/api/certificates`;

  constructor(private http: HttpClient) {}

  getCertificates$(): Observable<Certificate[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46RWVuRWVudm91ZGlnV2FjaHR3b29yZA=='
      })
    };
    return this.http.get<Certificate[]>(this.baseUrl, httpOptions);
  }
}
