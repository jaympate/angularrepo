import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogpostComponent} from './blogpost.component';
import {BlogpostOverviewComponent} from './blogpost-overview/blogpost.overview.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataModule} from '../data/data.module';
import {DateModule} from '../../common/common.module';
import {BlogpostRowComponent} from './blogpost-overview/blogpost-row/blogpost.row.component';

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
    BlogpostRowComponent,
    BlogpostOverviewComponent
  ]
})
export class BlogpostModule {

}
