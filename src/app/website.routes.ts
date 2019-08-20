import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsiteRoutes {
  constructor(private router: Router) {
  }

  getActive(path: string): string {
    return this.router.url === ('/' + path) ? 'active' : '';
  }

  get timelineUrlActive(): string {
    // professionele loopbaan via timeline
    return this.router.url === '/timeline' ? 'active' : '';
  }

  get dataUrlActive(): string {
    // boeken (Tabel), fitness (grafiek), opleidingen, conferences etc.
    return this.router.url === '/data' ? 'active' : '';
  }
}

export interface NavigationOption {
  path: string;
  text: string;
}

/*            <!--   <li class="nav-item" [ngClass]="getActiveTimelineUrl()">
                 <a class="nav-link" routerLink="timeline">{{'website.timeline' | translate}}</a>
               </li>
               <li class="nav-item" [ngClass]="getActiveDataUrl()">
                 <a class="nav-link disabled" routerLink="data">{{'website.data' | translate}}</a>
               </li>-->*/
