import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BackendTranslations} from './backend.translations';

@Injectable({
  providedIn: 'root'
})
export class BackendTranslationService {
  constructor(private http: HttpClient) {
  }

  private readonly baseUrl = `http://www.dieterjordens.be:10002/api/translations`;

  getBackendTranslations$() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZGlldGVyOkVlbkVlZW52b3VkaWdXYWNodHdvb3Jk'
      })
    };
    return this.http.get<BackendTranslations>(this.baseUrl, httpOptions);
  }
}
