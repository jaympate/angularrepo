import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataModule} from '../data/data.module';
import {BookComponent} from './book.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    DataModule
  ],
  declarations: [
    BookComponent,
    BooksComponent
  ]
})
export class BookModule {

}
