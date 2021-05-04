import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Book} from './book';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly baseUrl = `https://www.dieterjordens.com/api/books`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + environment.token
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getBooks$(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl, this.httpOptions).pipe(
      catchError((error: Error) => {
        console.error(`An error has occurred when retrieving books: ${error.message}`);
        return of([]);
      })
    );
  }
}
