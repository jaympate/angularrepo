import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Blogpost} from './blogpost';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[blogpost-row]',
  templateUrl: 'blogpost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogpostComponent {
  @Input()
  blogpost: Blogpost;

  @Input()
  rowNumber: number;
}
