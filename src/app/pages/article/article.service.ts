import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Article} from './article';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly baseUrl = `https://www.dieterjordens.com/api/articles`;

  constructor(private http: HttpClient) {}

  getArticles$(): Observable<Article[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46RWVuRWVudm91ZGlnV2FjaHR3b29yZA=='
      })
    };
    return this.http.get<Article[]>(this.baseUrl, httpOptions);
  }
}
