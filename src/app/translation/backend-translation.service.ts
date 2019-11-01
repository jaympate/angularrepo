import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BackendTranslations} from './backend.translations';

@Injectable({
  providedIn: 'root'
})
export class BackendTranslationService {


  constructor(private http: HttpClient) {
  }

  private readonly baseUrl = `https://dj-website.herokuapp.com/api/translation`;

  getBackendTranslations$() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46d2FjaHR3b29yZFZvb3JCb2VrZW4='
      })
    };
    return this.http.get<BackendTranslations>(this.baseUrl, httpOptions);
  }
}
