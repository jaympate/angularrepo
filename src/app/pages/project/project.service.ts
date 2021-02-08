import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl = `www.dieterjordens.com:10002/api/projects`;
  private readonly projects$: Observable<Project[]>;

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46RWVuRWVudm91ZGlnV2FjaHR3b29yZA=='
      })
    };
    this.projects$ = this.http.get<Project[]>(this.baseUrl, httpOptions);
  }

  getProjects$(): Observable<Project[]> {
    return this.projects$;
  }
}
