import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogpostsComponent} from './blogposts.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataModule} from '../data/data.module';
import {DateModule} from '../../common/date.module';
import {BlogpostComponent} from './blogpost/blogpost.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    DataModule,
    DateModule
  ],
  declarations: [
    BlogpostComponent,
    BlogpostsComponent
  ]
})
export class BlogpostModule {

}
