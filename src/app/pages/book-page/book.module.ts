import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './books-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataModule } from '../data/data.module';
import { BookComponent } from './book.component';
import { BookRatingComponent } from './book.rating.component';
import { ImageModule } from '../../common/image.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    DataModule,
    ImageModule,
    LazyLoadImageModule
  ],
  declarations: [
    BookComponent,
    BooksPageComponent,
    BookRatingComponent
  ]
})
export class BookModule {}
