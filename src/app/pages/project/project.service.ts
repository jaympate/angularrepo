import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl = `https://www.dieterjordens.com/api/projects`;
  private readonly projects$: Observable<Project[]>;

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + environment.token
      })
    };
    this.projects$ = this.http.get<Project[]>(this.baseUrl, httpOptions);
  }

  getProjects$(): Observable<Project[]> {
    return this.projects$;
  }
}
