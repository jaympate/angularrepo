import {NgModule} from '@angular/core';
import {DataComponent} from './data.component';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SortableHeaderDirective} from './sortable-header.directive';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DataComponent,
    SortableHeaderDirective
  ],
  providers: [
    DecimalPipe
  ]
})
export class DataModule {

}
