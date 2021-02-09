import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { FaqOptionComponent } from './faq-option/faq-option.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [FaqOptionComponent, HomeComponent]
})
export class HomeModule {}
