import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from './book';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly baseUrl = `https://www.dieterjordens.com/api/books`;

  constructor(private http: HttpClient) {}

  getBooks$(): Observable<Book[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46RWVuRWVudm91ZGlnV2FjaHR3b29yZA=='
      })
    };
    return this.http.get<Book[]>(this.baseUrl, httpOptions);
  }
}
