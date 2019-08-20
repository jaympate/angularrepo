import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand text" href="#">
          DJ
        </a>
        <button class="navbar-toggler toggleNavBar" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" [attr.aria-expanded]="!isCollapsed" aria-label="Toggle navigation"
                (click)="toggle()">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" [ngbCollapse]="isCollapsed">
          <app-nav-options class="mr-auto"></app-nav-options>
          <app-language-selector></app-language-selector>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCollapsed = true;

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
