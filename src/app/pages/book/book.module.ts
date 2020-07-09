import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataModule} from '../data/data.module';
import {BookComponent} from './book.component';
import {BookRatingComponent} from './book.rating.component';
import {ImageModule} from '../../common/image.module';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    DataModule,
    ImageModule,
    LazyLoadImageModule
  ],
  declarations: [
    BookComponent,
    BooksComponent,
    BookRatingComponent
  ]
})
export class BookModule {
}
