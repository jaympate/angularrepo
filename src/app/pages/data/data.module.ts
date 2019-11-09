import {NgModule} from '@angular/core';
import {DataComponent} from './data.component';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SortableHeaderDirective} from './sortable-header.directive';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NumberToStringPipe} from './no.comma.pipe';
import {BookOverviewComponent} from './book/book.overview.component';
import {BlogpostOverviewComponent} from './blogpost/blogpost.overview.component';
import {DateLocaleFilter} from './date.locale.filter';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DataComponent,
    BookOverviewComponent,
    BlogpostOverviewComponent,
    SortableHeaderDirective,
    NumberToStringPipe,
    DateLocaleFilter
  ],
  providers: [
    DecimalPipe
  ]
})
export class DataModule {

}
