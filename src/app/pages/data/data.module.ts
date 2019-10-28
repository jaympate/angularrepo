import {NgModule} from '@angular/core';
import {DataComponent} from './data.component';
import {CommonModule} from '@angular/common';
import {SortableHeaderDirective} from './sortable-header.directive';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    DataComponent,
    SortableHeaderDirective
  ]
})
export class DataModule {

}
