import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand text" href="#">
          DJ
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" [attr.aria-expanded]="!isCollapsed" aria-label="Toggle navigation"
                (click)="toggle()">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" [ngbCollapse]="isCollapsed">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" [ngClass]="getActiveHomeUrl()">
              <a class="nav-link navigation" routerLink="">{{'website.home' | translate}}</a>
            </li>
            <li class="nav-item" [ngClass]="getActiveVisionUrl()">
              <a class="nav-link navigation" routerLink="vision">{{'website.vision' | translate}}</a>
            </li>
            <li class="nav-item" [ngClass]="getActiveCvUrl()">
              <a class="nav-link navigation" routerLink="cv">{{'website.cv' | translate}}</a>
            </li>
            <!--   <li class="nav-item" [ngClass]="getActiveTimelineUrl()">
                 <a class="nav-link" routerLink="timeline">{{'website.timeline' | translate}}</a>
               </li>
               <li class="nav-item" [ngClass]="getActiveDataUrl()">
                 <a class="nav-link disabled" routerLink="data">{{'website.data' | translate}}</a>
               </li>-->
          </ul>
          <app-language-selector></app-language-selector>
        </div>
      </nav>
    </header>
    <main class="body">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
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

  getActiveVisionUrl(): string {
    return this.router.url === '/vision' ? 'active' : '';
  }

  getActiveCvUrl(): string {
    return this.router.url === '/cv' ? 'active' : '';
  }

  getActiveTimelineUrl(): string {
    // professionele loopbaan via timeline
    return this.router.url === '/timeline' ? 'active' : '';
  }

  getActiveDataUrl(): string {
    // boeken (Tabel), fitness (grafiek), opleidingen, conferences etc.
    return this.router.url === '/data' ? 'active' : '';
  }
}
