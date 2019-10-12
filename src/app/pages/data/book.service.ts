import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {
  }

  private readonly baseUrl = `http://dj-website-backend.herokuapp.com:8080/api/book`;

  getBooks$() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic YWRtaW46d2FjaHR3b29yZFZvb3JCb2VrZW4='
      })
    };
    return this.http.get<Book[]>(this.baseUrl, httpOptions);
  }
}
