import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Article} from './article';
import {ArticleService} from './article.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'my-articles',
  template: `
    <div class="container-fluid pt-2 pb-2">
      <h2 class="articles-title">ARTICLES</h2>
      <ng-container *ngIf="articles$ | async as articles">
        <div class="articles-container">
          <article *ngFor="let article of articles"
            class="article-container"
            [article]="article">
          </article>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./articles-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesPageComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles$();
  }
}
