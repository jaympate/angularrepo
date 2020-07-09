import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogpostsComponent} from './blogposts.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataModule} from '../data/data.module';
import {DateModule} from '../../common/date.module';
import {BlogpostComponent} from './blogpost.component';
import {ImageModule} from '../../common/image.module';
import {MonitorComponent} from './monitor.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbModule,
        DataModule,
        DateModule,
        ImageModule,
        LazyLoadImageModule
    ],
  declarations: [BlogpostComponent, BlogpostsComponent, MonitorComponent]
})
export class BlogpostModule {
}
