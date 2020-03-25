import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Blogpost} from './blogpost';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateServiceFacade} from '../../../translation/translate.service.facade';
import {filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private untranslatedBlogposts: Blogpost[];
  private readonly translatedBlogposts$: Observable<Blogpost[]>;
  private readonly baseUrl = `https://dj-website-backend.herokuapp.com/api/blogpost`;

  constructor(private http: HttpClient, private translateService: TranslateServiceFacade) {
    const currentLanguage$ = translateService.getCurrentLanguage$();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46d2FjaHR3b29yZFZvb3JCb2VrZW4='
      })
    };
    const blogposts$: Observable<Blogpost[]> = this.http.get<Blogpost[]>(this.baseUrl, httpOptions);

    this.translatedBlogposts$ = combineLatest([blogposts$, currentLanguage$])
      .pipe(
        filter( ([, currentLanguage]) => !!currentLanguage),
        map(([blogposts]) => blogposts),
        tap(blogposts => this.cacheBlogposts(blogposts)),
        map(() => this.translateBlogposts())
      );
  }

  getBlogposts$(): Observable<Blogpost[]> {
    return this.translatedBlogposts$;
  }

  private cacheBlogposts(blogposts: Blogpost[]) {
    if (!this.untranslatedBlogposts) {
      this.untranslatedBlogposts = blogposts;
    }
  }

  private translateBlogposts(): Blogpost[] {
    return this.untranslatedBlogposts.map(blogpost => ({
      ...blogpost,
      title: this.translateService.getTranslationKnowingTheyAreLoaded(blogpost.title)
    }));
  }
}
