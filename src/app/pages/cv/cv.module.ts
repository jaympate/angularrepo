import { NgModule } from '@angular/core';
import { CvComponent } from './cv.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [LazyLoadImageModule],
  declarations: [CvComponent]
})
export class CvModule {}
