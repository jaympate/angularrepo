import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="/assets/images/logo.png" width="84" height="94" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" [attr.aria-expanded]="!isCollapsed" aria-label="Toggle navigation"
                (click)="toggle()">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent" [ngbCollapse]="isCollapsed">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" [ngClass]="getActiveHomeUrl()">
              <a class="nav-link" routerLink="">{{'website.home' | translate}}</a>
            </li>
            <li class="nav-item" [ngClass]="getActiveAboutUrl()">
              <a class="nav-link" routerLink="about">{{'website.about' | translate}}</a>
            </li>
            <li class="nav-item" [ngClass]="getActiveCvUrl()">
              <a class="nav-link disabled" routerLink="cv">{{'website.cv' | translate}}</a>
            </li>
            <li class="nav-item" [ngClass]="getActiveTimelineUrl()">
              <a class="nav-link disabled" routerLink="timeline">{{'website.timeline' | translate}}</a>
            </li>
            <li class="nav-item" [ngClass]="getActiveDataUrl()">
              <a class="nav-link disabled" routerLink="data">{{'website.data' | translate}}</a>
            </li>
          </ul>
          <app-language-selector></app-language-selector>
        </div>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  getActiveHomeUrl(): string {
    return this.router.url === '/' ? 'active' : '';
  }

  getActiveAboutUrl(): string {
    // met welke frameworks werk je
    // wat zijn de normen en waarden die je uitdraagt
    // vooral visueel weergeven met behulp van tiles
    return this.router.url === '/about' ? 'active' : '';
  }

  getActiveTimelineUrl(): string {
    // professionele loopbaan via timeline
    return this.router.url === '/timeline' ? 'active' : '';
  }

  getActiveCvUrl(): string {
    // cv weergave opleiding e.d. (verberg dingen via toggle etc.)
    return this.router.url === '/cv' ? 'active' : '';
  }

  getActiveDataUrl(): string {
    // boeken (Tabel), fitness (grafiek), opleidingen, conferences etc.
    return this.router.url === '/data' ? 'active' : '';
  }
}
