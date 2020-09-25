import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateServiceFacade} from '../../translation/translate.service.facade';
import {map, tap} from 'rxjs/operators';
import {Project} from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private untranslatedProjects: Project[];
  private readonly translatedProjects$: Observable<Project[]>;

  constructor(
    private http: HttpClient,
    private translateService: TranslateServiceFacade
  ) {
    const currentLanguage$ = translateService.getCurrentLanguage$();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ZGlldGVyOkVlbkVlbnZvdWRpZ1dhY2h0d29vcmQ='
      })
    };
    const projects$: Observable<Project[]> = this.http.get<Project[]>(
      this.baseUrl,
      httpOptions
    );

    this.translatedProjects$ = combineLatest([
      projects$,
      currentLanguage$
    ]).pipe(
      map(([projects]) => projects),
      tap((projects) => this.cacheProjects(projects)),
      map(() => this.translateProjects())
    );
  }

  private readonly baseUrl = `http://www.dieterjordens.be:10002/api/projects`;

  getProjects$(): Observable<Project[]> {
    return this.translatedProjects$;
  }

  private cacheProjects(projects: Project[]) {
    if (!this.untranslatedProjects) {
      this.untranslatedProjects = projects;
    }
  }

  private translateProjects(): Project[] {
    return this.untranslatedProjects.map((project) => ({
      ...project,
      client: this.translateService.getTranslationKnowingTheyAreLoaded(
        project.client
      ),
      jobTitle: this.translateService.getTranslationKnowingTheyAreLoaded(
        project.jobTitle
      ),
      jobDescription: this.translateService.getTranslationKnowingTheyAreLoaded(
        project.jobDescription
      ),
      timeSpan: this.translateService.getTranslationKnowingTheyAreLoaded(
        project.timeSpan
      )
    }));
  }
}
