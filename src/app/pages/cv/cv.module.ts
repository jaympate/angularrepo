import { NgModule } from '@angular/core';
import { CvComponent } from './cv.component';
import { TranslationModule } from '../../translation/translation.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [TranslationModule, LazyLoadImageModule],
  declarations: [CvComponent]
})
export class CvModule {}
