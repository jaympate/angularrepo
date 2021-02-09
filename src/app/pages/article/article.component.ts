import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from './article';

@Component({
  selector: '[article-row]',
  template: `
    <th scope="row">{{ rowNumber }}</th>
    <td>
      <app-monitor
        [key]="article.title"
        [title]="article.title"
        [url]="article.url"
      ></app-monitor>
    </td>
    <td>
      <ngb-highlight
        class="article-publication-date"
        [result]="article.publicationDate | dateLocale: 'DD MMMM YYYY'"
      ></ngb-highlight>
    </td>
    <td>
      <ngb-highlight
        class="article-title"
        [result]="article.title"
      ></ngb-highlight>
    </td>
    <td>
      <ngb-highlight
        class="article-category"
        [result]="article.category"
      ></ngb-highlight>
    </td>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  @Input()
  article: Article;

  @Input()
  rowNumber: number;
}
