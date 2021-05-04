import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ArticleHttpInterceptor implements HttpInterceptor {
  private readonly apiUrl = 'https://www.dieterjordens.com/api/articles';

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(!environment.production){
      console.log('Intercepted request: ' + httpRequest.url);
      if (httpRequest.url === this.apiUrl) {
        return of(new HttpResponse({
          status: 200, body: JSON.parse(`[
          {
            "id": "33",
            "title": "How To Push a Docker Image to Amazon ECR With Jenkins",
            "publicationDate": "2021-02-12",
            "url": "https://medium.com/better-programming/how-to-push-a-docker-image-to-amazon-ecr-with-jenkins-ed4b042e141a?source=friends_link&sk=59e1f6ebac8a770086c4245d685c305d",
            "introduction": "A year ago, my website was running on Heroku. Because Heroku does not allow multiple applications on the same instance, I had to pay $7 twice each month (backend and frontend application). For each…",
            "category": "Other"
          },
          {
            "id": "22",
            "title": "What Is a Tensor",
            "publicationDate": "2021-01-12",
            "url": "https://medium.com/better-programming/what-is-a-tensor-9df05c178a39?source=friends_link&sk=7134bf7117f004ce1c053db6418c864a",
            "introduction": "Today, we’re about to discover what a tensor is. It’s one of the most basic data structures. In fact, it’s so fundamental that TensorFlow was named after it! If you’d like to understand what it…",
            "category": "AI"
          },
          {
            "id": "11",
            "title": "What is Deep Learning",
            "publicationDate": "2020-11-26",
            "introduction": "What is Deep Learning? Questions like why is Deep Learning deep and what does it have to do with the human brain are covered in this brain-friendly article.",
            "url": "https://towardsdatascience.com/what-is-deep-learning-33a32858ea6d?sk=0d2844e9566813b96fdefa29f4300ae1",
            "category": "AI"
          }
        ]`)
        }));
      }
    }
    return httpHandler.handle(httpRequest);
  }
}
