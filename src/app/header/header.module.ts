import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { NavOptionsComponent } from './nav-options/nav.options.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../translation/translation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { HamburgerToggleDirective } from './hamburger-toggle.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    NavOptionsComponent,
    HamburgerToggleDirective
  ],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    TranslationModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ]
})
export class HeaderModule {}
