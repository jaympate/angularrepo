import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Certificate} from './certificate';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly baseUrl = `https://www.dieterjordens.com/api/certificates`;

  constructor(private http: HttpClient) {}

  getCertificates$(): Observable<Certificate[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Certificate[]>(this.baseUrl, httpOptions);
  }
}
