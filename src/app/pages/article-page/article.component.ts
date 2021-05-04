import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Article} from './article';

@Component({
  selector: 'article',
  template: `
    <div data-div-container class="article-padding-bottom">
      <img data-article-image class="article-img-top" defaultImage="assets/images/loading.gif"
           [lazyLoad]="lazyLoad"
           [alt]="article.title">
      <div data-article-body>
        <h5 data-article-title
            [textContent]="article.title"></h5>
        <div data-article-date
             [textContent]="article.publicationDate | date : 'mediumDate'"></div>
        <div data-article-bar class="article-bar"></div>
        <div data-article-introduction>{{article.introduction}}&nbsp;<a data-article-url [href]="article.url">Read more</a></div>
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input()
  article: Article;

  lazyLoad: string;

  ngOnInit(): void {
    this.lazyLoad = 'https://djarticles.s3.eu-west-3.amazonaws.com/' + this.article.id + '.jpeg';
  }
}
