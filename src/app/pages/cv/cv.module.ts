import {NgModule} from '@angular/core';
import {CvComponent} from './cv.component';
import {TranslationModule} from '../../translation/translation.module';

@NgModule({
  imports: [TranslationModule],
  declarations: [CvComponent]
})
export class CvModule {
}
