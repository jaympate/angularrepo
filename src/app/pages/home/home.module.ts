import {NgModule} from '@angular/core';
import {TranslationModule} from '../../translation/translation.module';
import {HomeComponent} from './home.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';

@NgModule({
  imports: [
    TranslationModule,
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
