import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataModule} from '../data/data.module';
import {BookComponent} from './book.component';
import {SafeBase64Image} from './safe.base64.image';
import {BookRatingComponent} from './book.rating.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    DataModule
  ],
  declarations: [
    BookComponent,
    BooksComponent,
    SafeBase64Image,
    BookRatingComponent
  ]
})
export class BookModule {

}
