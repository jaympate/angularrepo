import {NgModule} from '@angular/core';
import {DataComponent} from './data.component';
import {CommonModule} from '@angular/common';
import {SortableHeaderDirective} from './sortable-header.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataComponent,
    SortableHeaderDirective
  ]
})
export class DataModule {

}
