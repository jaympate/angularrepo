import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogpostComponent {
}
