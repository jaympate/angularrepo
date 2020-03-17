import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Blogpost} from '../blogpost';

@Component({
  selector: '[blogpost-row]',
  templateUrl: 'blogpost.row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogpostRowComponent {
  @Input()
  blogpost: Blogpost;

  @Input()
  rowNumber: number;
}
