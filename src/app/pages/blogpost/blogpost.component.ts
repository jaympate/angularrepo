import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Blogpost} from './blogpost';

@Component({
  selector: '[blogpost-row]',
  template: `
    <th scope="row">{{ rowNumber }}</th>
    <td>
      <app-monitor
        [key]="blogpost.key"
        [title]="blogpost.title"
        [url]="blogpost.url"
      ></app-monitor>
    </td>
    <td>
      <ngb-highlight
        class="blogpost-publication-date"
        [result]="blogpost.publicationDate | dateLocale: 'DD MMMM YYYY'"
      ></ngb-highlight>
    </td>
    <td>
      <ngb-highlight
        class="blogpost-title"
        [result]="blogpost.title"
      ></ngb-highlight>
    </td>
    <td>
      <ngb-highlight
        class="blogpost-category"
        [result]="blogpost.category"
      ></ngb-highlight>
    </td>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogpostComponent {
  @Input()
  blogpost: Blogpost;

  @Input()
  rowNumber: number;
}
